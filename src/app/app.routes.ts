import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page';

export const routes: Routes = [
    {
        path: '',
        //loadComponent: () => import('./pages/main-page/main-page').then(m => m.MainPageComponent)
        component: MainPageComponent
    },
    {
        path: '*',
        redirectTo: ''
    }
];
