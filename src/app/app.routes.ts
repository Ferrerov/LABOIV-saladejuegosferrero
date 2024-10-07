import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'registro', loadComponent: () => import('./components/registro/registro.component').then(m => m.RegistroComponent) },
  { path: 'quiensoy', loadComponent: () => import('./components/quiensoy/quiensoy.component').then(m => m.QuiensoyComponent) },
  { path: 'ahorcado', loadComponent: () => import('./components/ahorcado/ahorcado.component').then(m => m.AhorcadoComponent) },
];
