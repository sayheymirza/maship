import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';

import { publicIpv4 } from 'public-ip';
import { rateLimit } from 'express-rate-limit';

import axios from "axios";
import cors from "cors";

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  server.use(cors());


  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
  })

  server.get('/api/v1/ip', limiter, async (req, res) => {
    let ip = req.query['ip'] ?? req.headers['CF-Connecting-IP'] ?? req.headers['cf-pseudo-ipv4'] ?? req.headers['x-forwarded-for'] ?? req.socket.remoteAddress;

    if (ip == '::1') {
      ip = await publicIpv4();
    }

    const result = await axios.get(`https://api.ohmyapi.com/v1/call/api.v1.ip.lookup?ip=${ip}`, {
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidG9rZW4iLCJpZCI6NiwiaWF0IjoxNzE5MTY1MjMyfQ.CWoyp1pKL6dHsBYDyDIE-5R88br8Hp0QouPBoOeFyHY'
      }
    });

    res.status(result.status).json(result.data);
  });

  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
