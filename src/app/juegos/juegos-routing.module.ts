import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../components/ahorcado/ahorcado.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'ahorcado', loadComponent: () => import('../components/ahorcado/ahorcado.component').then(m => m.AhorcadoComponent) },
  { path: 'mayormenor', loadComponent: () => import('../components/mayormenor/mayormenor.component').then(m => m.MayormenorComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { 

  
}
