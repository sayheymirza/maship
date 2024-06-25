import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
      <nav class="flex flex-nowrap items-center gap-2 container h-full mx-auto">
        <a routerLink="/" class="ms-2 flex flex-nowrap items-center">
          <img ngSrc="/icons/icon-128x128.png" alt="MashIP Logo" width="54" height="54" />

          <strong class="text-xl">مش آیپی</strong>
        </a>

        <div class="flex-1"></div>
        
        <a href="https://console.ohmyapi.com" target="_blank" class="btn btn-primary">
          توسعه دهندگان
        </a>
      </nav>
  `,
  host: {
    class: 'block min-h-16'
  }
})
export class HeaderComponent {

}
