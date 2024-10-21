import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EquipoInterface } from '../../interfaces/equipo.interface';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [MatButton, CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent implements OnInit {
  imagen:string = '';
  apiService = inject(ApiService);
  equipo: EquipoInterface | null= null;
  comenzo: boolean = false;
  pregunta: string = '¿A que equipo pertenece este escudo?';
  equipos: string[] = [
    'Arsenal', 'Manchester_United', 'Liverpool', 'Chelsea', 'Tottenham',
    'Real_Madrid', 'Barcelona', 'Atletico_Madrid', 'Sevilla', 'Valencia',
    'Juventus', 'AC_Milan', 'Roma', 'Napoli', 'Marseille', 'Lyon', 'Monaco', 'Lille',
    'Boca_Juniors', 'River_Plate', 'Flamengo', 'Palmeiras', 'Santos',
    'Corinthians', 'Sao_Paulo', 'Gremio', 'Internacional', 'Cruzeiro',
    'Nacional', 'Peñarol', 'Independiente', 'Racing_Club', 'San_Lorenzo'
  ];
  opciones: string[] = [];
  respuestaCorrecta: string = '';
  vidas: number = 4;
  puntos: number = 0;

  ngOnInit(): void {
    
  }
  comenzarJuego(){
    this.comenzo = true;
    this.seleccionarEquipo();
  }

  seleccionarEquipo()
  {
    const indiceCorrecto = Math.floor(Math.random() * this.equipos.length);
    this.respuestaCorrecta = this.equipos[indiceCorrecto];
    this.equipos.splice(indiceCorrecto, 1);

    const opcionesIncorrectas: string[] = [];
    while (opcionesIncorrectas.length < 2) {
      const indice = Math.floor(Math.random() * this.equipos.length);
      const equipo = this.equipos[indice];
      if (!opcionesIncorrectas.includes(equipo)) {
        opcionesIncorrectas.push(equipo);
      }
    }

    this.opciones = [this.respuestaCorrecta, ...opcionesIncorrectas].sort(() => Math.random() - 0.5);
    this.obtenerEquipo(this.respuestaCorrecta);
  }

  obtenerEquipo(equipo:string){
    this.apiService.getEquipo(equipo).subscribe(equipos => {
      console.log(equipos);
      this.equipo = equipos[0];
      this.imagen = equipos[0].strBadge;
      console.log(this.equipo);
    });
  }

  seleccionarOpcion(opcion: string, event: Event) {
    const botonSeleccionado = event.currentTarget as HTMLButtonElement;
    console.log('Opción seleccionada: ' + opcion);
    console.log('Opción correcta: ' + this.respuestaCorrecta);
  
    const botonesOpciones = document.querySelectorAll('.opcion button');
    botonesOpciones.forEach((boton: Element) => {
      (boton as HTMLButtonElement).disabled = true;
    });
    if (opcion === this.respuestaCorrecta) {
      botonSeleccionado.classList.add('correcta');
      this.puntos++;
    } else {
      botonSeleccionado.classList.add('incorrecta');
      this.vidas--;
  
      const botonesOpciones = document.querySelectorAll('.opcion button');
      botonesOpciones.forEach((boton: Element) => {
        if (boton.textContent?.trim() === this.respuestaCorrecta.replace('_', ' ')) {
          boton.classList.add('correcta');
        }
      });
    }
  
    setTimeout(() => {
      botonSeleccionado.classList.remove('correcta', 'incorrecta'); 
      const botonesOpciones = document.querySelectorAll('.opcion button');
      botonesOpciones.forEach((boton: Element) => {
        boton.classList.remove('correcta', 'incorrecta');
        (boton as HTMLButtonElement).disabled = false;
      });
      this.seleccionarEquipo();
    }, 2500);
  }
}
