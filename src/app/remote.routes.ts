import type { Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';

export const REMOTE_ROUTES: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
];
