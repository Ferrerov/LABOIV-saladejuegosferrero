import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'quiensoy', component: QuiensoyComponent},
];
