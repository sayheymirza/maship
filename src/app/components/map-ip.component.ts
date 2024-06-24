import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

declare const L: any;

@Component({
  selector: 'app-map-ip',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="w-full h-full absolute inset-0 z-0" #map></div>

    <div class="flex flex-col z-10 w-72 p-4 h-full overflow-y-scroll relative bg-gradient-to-bl from-white/80 to-white/60 backdrop-blur shadow-xl transition-all"
      [class.-right-72]="ip == undefined"
    >
      <!-- ip input -->
      <div class="form-control">
        <div class="input input-bordered input-sm bg-transparent flex flex-nowrap items-center gap-2"
          [class.input-error]="badIp"
        >
          <i class="material-icons-round text-gray-400 !text-[20px]">search</i>
          <input [(ngModel)]="ip" (keyup)="onIpKeyUp()" type="text" dir="ltr" placeholder="اون IP که می خواهید رو وارد کنید" class="grow text-right"/>
        </div>

        <label class="label">
          <span class="label-text text-xs text-error h-[24px]" [class.opacity-0]="!badIp">این IP اشتباه است</span>
        </label>
      </div>

      @if(data) {
          <div class="grid grid-cols-4 gap-1 mb-4">
            <div class="flex flex-col items-center gap-2 rounded-btn px-2 py-4 transition-all hover:bg-black/5"
              [class.text-gray-400]="!data['mobile']"
              [class.text-green-500]="data['mobile']"
              >
              <i class="material-icons-round">smartphone</i>
              <span class="text-xs">موبایل</span>
            </div>

            <div class="flex flex-col items-center gap-2 rounded-btn px-2 py-4 transition-all hover:bg-black/5"
              [class.text-gray-400]="!data['crawler']"
              [class.text-green-500]="data['crawler']"
              >
              <i class="material-icons-round">smart_toy</i>
              <span class="text-xs">ربات</span>
            </div>

            <div class="flex flex-col items-center gap-2 rounded-btn px-2 py-4 transition-all hover:bg-black/5"
              [class.text-gray-400]="!data['datacenter']"
              [class.text-green-500]="data['datacenter']"
              >
              <i class="material-icons-round">dns</i>
              <span class="text-xs">دیتاسنتر</span>
            </div>

            <div class="flex flex-col items-center gap-2 rounded-btn px-2 py-4 transition-all hover:bg-black/5"
              [class.text-gray-400]="!data['vpn']"
              [class.text-green-500]="data['vpn']"
              >
              <i class="material-icons-round">vpn_key</i>
              <span class="text-xs">دیتاسنتر</span>
            </div>
          </div>

          <div class="flex flex-nowrap items-center gap-4 px-4">
            <img
              class="w-14 h-10 rounded-lg object-conver object-center"
              src="https://www.worldometers.info/img/flags/{{data['country_code'].toLowerCase()}}-flag.gif"
              alt="{{data['Country']}}" />
            
            <div class="flex flex-col gap-1 flex-1">
              <span class="text-xs text-gray-600">کشور</span>
              <strong>{{data['country']}}</strong>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-2 rounded-btn p-2 transition-all hover:bg-black/5">
              <span class="text-xs text-gray-600">قاره</span>
              <strong>{{data['continent']}}</strong>
            </div>
            
            <div class="flex flex-col gap-2 rounded-btn p-2 transition-all hover:bg-black/5">
              <span class="text-xs text-gray-600">شهر</span>
              <strong>{{data['city']}}</strong>
            </div>
            
            <div class="flex flex-col gap-2 rounded-btn p-2 col-span-2 transition-all hover:bg-black/5">
              <span class="text-xs text-gray-600">منطقه زمانی</span>
              <strong>{{data['timezone']}}</strong>
            </div>
            
            <div class="flex flex-col gap-2 rounded-btn p-2 col-span-2 transition-all hover:bg-black/5">
              <span class="text-xs text-gray-600">زمان کنونی</span>
              <strong>{{data['date']}}</strong>
            </div>

            <div class="flex flex-col gap-2 rounded-btn p-2 transition-all hover:bg-black/5">
              <span class="text-xs text-gray-600">نوع</span>
              <strong>{{data['type'].toUpperCase()}}</strong>
            </div>

            <div class="flex flex-col gap-2 rounded-btn p-2 transition-all hover:bg-black/5">
              <span class="text-xs text-gray-600">ASN</span>
              <strong>{{data['asn']}}</strong>
            </div>
            
            <div class="flex flex-col gap-2 rounded-btn p-2 col-span-2 transition-all hover:bg-black/5">
              <span class="text-xs text-gray-600">شرکت ارائه دهنده</span>
              <strong>{{data['company']}}</strong>
            </div>
            
            @if(data['range']) {
              <div class="flex flex-col gap-2 rounded-btn p-2 col-span-2 transition-all hover:bg-black/5">
                <span class="text-xs text-gray-600">رنج آی پی</span>
                <strong>{{data['range']}}</strong>
              </div>
            }
          </div>
      }
    </div>
  `,
  host: {
    class: 'block overflow-hidden relative'
  }
})
export class MapIpComponent {
  @ViewChild('map')
  private mapElem!: ElementRef;

  private map: any;
  private marker: any;

  public ip?: string;
  public badIp: boolean = false;

  public data: any;

  private timeout: any;

  constructor(
    @Inject(PLATFORM_ID)
    private platform: string,
    private apiService: ApiService
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platform)) {
      this.map = L.map(this.mapElem.nativeElement, {
        attributionControl: false,
        zoomControl: false
      }).setView([0, 0], 2);

      L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
      }).addTo(this.map);

      this.lookup();
    }
  }

  public onIpKeyUp() {
    const regex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;

    clearTimeout(this.timeout);

    if (this.ip!.length == 0) {
      this.badIp = false;
    }
    else if (regex.test(this.ip!)) {
      this.badIp = false;

      this.timeout = setTimeout(() => {
        this.lookup();
      }, 100);
    } else {
      this.badIp = true;
    }
  }

  private lookup() {
    this.apiService.lookup(this.ip).then((res) => {
      if (res['status']) {
        this.data = res['data'];
        this.ip = this.data['ip'];

        console.log(this.ip);


        const date = new Date(this.data['local_time']);

        this.data['date'] = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        if (this.data['latitude']) {
          const icon = L.divIcon({
            className: 'custom-div-icon',
            html: "<i class='material-icons-round !text-[36px] !w-[36px] !h-[36px] text-red-500'>place</i>",
            iconSize: [36, 36],
            iconAnchor: [36 / 2, 36]
          });

          const latlon = [this.data['latitude'], this.data['longitude']];

          this.marker = L.marker(latlon, {
            icon: icon
          }).addTo(this.map);

          this.map.flyTo(latlon, 11);
        }
      }
    });
  }
}
