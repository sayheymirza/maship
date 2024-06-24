import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <p class="flex flex-nowrap items-center gap-1">
      <i class="material-icons-round text-red-500">favorite</i>
      <span>قدرت گرفته از <a href="https://ohmyapi.com" class="text-blue-500">OhMyAPI.com</a></span>
    </p>
  `,
  host: {
    class: 'flex flex-nowrap items-center container mx-auto h-8 px-4'
  }
})
export class FooterComponent {

}
