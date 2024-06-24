import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
      <nav class="flex flex-nowrap items-center gap-2 container h-full mx-auto">
        <a routerLink="/" class="ms-2">
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
