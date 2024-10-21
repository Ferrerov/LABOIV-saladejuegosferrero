import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../components/ahorcado/ahorcado.component';
import { PreguntadosComponent } from '../components/preguntados/preguntados.component';
import { JuegodelquinceComponent } from '../components/juegodelquince/juegodelquince.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'ahorcado', loadComponent: () => import('../components/ahorcado/ahorcado.component').then(m => m.AhorcadoComponent) },
  { path: 'mayormenor', loadComponent: () => import('../components/mayormenor/mayormenor.component').then(m => m.MayormenorComponent) },
  { path: 'preguntados', loadComponent: () => import('../components/preguntados/preguntados.component').then(m => m.PreguntadosComponent) },
  { path: 'juegodelquince', loadComponent: () => import('../components/juegodelquince/juegodelquince.component').then(m => m.JuegodelquinceComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { 

  
}
