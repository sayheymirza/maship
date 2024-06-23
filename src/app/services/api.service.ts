import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private httpClient: HttpClient
    ) { }

    public lookup(ip?: string) {        
        return lastValueFrom<any>(this.httpClient.get('http://localhost:4200/api/v1/ip' + (ip == undefined || ip.length == 0 ? '' : `?ip=${ip}`)));
    }
}