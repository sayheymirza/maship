import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../components/footer.component';
import { HeaderComponent } from '../components/header.component';
import { MapIpComponent } from '../components/map-ip.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, MapIpComponent, HeaderComponent, FooterComponent],
  template: `
    <app-header class="md:hidden px-4"/>

    <section class="grid md:grid-cols-2 gap-4 min-h-fit md:h-dvh">
      <app-map-ip class="rounded-btn m-4 h-[calc(100dvh-64px-36px)] md:h-[calc(100dvh-36px)]"/>

      <section class="flex flex-col gap-4 p-4">
         <app-header class="hidden md:block"/>

         <h1 class="text-6xl font-bold lg:max-w-[70%] leading-[5rem] mt-10">
            از یک IP این اطلاعات رو داشته باش
         </h1>

         <p class="max-w-[70%] leading-8 text-gray-600">یه API که بتونی فقط با همون IP که بهت درخواست می دهند بدونی کجاست، شرکت ارائه دهنده اش کیه، منطقه زمانیش چنده و خیلی چیز های دیگه</p>

         <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 lg:max-w-[70%]">
            <div class="flex flex-col items-start gap-2 p-4 rounded-btn transition-all hover:bg-base-200">
              <div class="flex flex-nowrap items-center gap-2">
                <i class="material-icons-round text-yellow-400">bolt</i>
                <h3 class="font-bold">قدرتمند و مقیاس پذیر</h3>
              </div>
              <p class="text-gray-600 text-sm leading-6">از هزار درخواست در ماه تا چندین میلیون در روز، زیرساخت ابری مقیاس‌پذیری که ما به شما ارائه می دهیم این توانایی را دارد.</p>
            </div>

            <div class="flex flex-col items-start gap-2 p-4 rounded-btn transition-all hover:bg-base-200">
              <div class="flex flex-nowrap items-center gap-2">
                <i class="material-icons-round text-sky-400">cloud_sync</i>
                <h3 class="font-bold">داده های بروز</h3>
              </div>
              <p class="text-gray-600 text-sm leading-6">سال ها جمع آوری داده ها و همکاری های طولانی مدت با ISP های بزرگ، بالاترین کیفیت داده IP را در حال حاضر در بازار رو تضمین می کنیم.</p>
            </div>

            <div class="flex flex-col items-start gap-2 p-4 rounded-btn transition-all hover:bg-base-200">
              <div class="flex flex-nowrap items-center gap-2">
                <i class="material-icons-round text-slate-400">build</i>
                <h3 class="font-bold">بسیار ساده</h3>
              </div>
              <p class="text-gray-600 text-sm leading-6">با REST API ما شما فقط کافیه IP رو درخواست دهید و تمامی اطلاعات رو به ساده ترین صورت JSON داشته باشید.</p>
            </div>

            <div class="flex flex-col items-start gap-2 p-4 rounded-btn transition-all hover:bg-base-200">
              <div class="flex flex-nowrap items-center gap-2">
                <i class="material-icons-round text-green-400">local_offer</i>
                <h3 class="font-bold">هزینه بصرفه</h3>
              </div>
              <p class="text-gray-600 text-sm leading-6">نه فقط اطلاعات IP بلکه API های دیگر را هم با هزینه های بسیار بصرفه و حتی رایگان از OhMyAPI دریافت کنید</p>
            </div>
         </div>

         <div class="flex flex-nowrap items-center justify-center md:justify-start gap-4">
          <a href="https://console.ohmyapi.com" class="btn btn-primary">
            دریافت توکن دسترسی
          </a>

          <a href="https://docs.ohmyapi.com/api?q=api.v1.ip.lookup" class="btn">
            مستندات و راهنمایی
          </a>
         </div>

         <app-footer class="hidden md:flex mt-auto"/>
      </section>
    </section>

    <app-footer class="md:hidden"/>
  `,
  host: {
    class: 'flex flex-col w-full'
  }
})
export class HomeComponent {

}
