import type { Routes } from '@angular/router';
import { REMOTE_ROUTES } from './remote.routes';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', children: REMOTE_ROUTES },
    { path: '**', redirectTo: 'home' },
];
