import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./routes/home.component').then((m) => m.HomeComponent),
    }
];
