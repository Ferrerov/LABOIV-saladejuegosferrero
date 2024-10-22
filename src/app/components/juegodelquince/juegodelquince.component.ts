import { Component } from '@angular/core';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Observable, Subject, timer, takeUntil, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-juegodelquince',
  standalone: true,
  imports: [MatButton, MatFabButton, MatIcon, AsyncPipe],
  templateUrl: './juegodelquince.component.html',
  styleUrls: ['./juegodelquince.component.scss']
})
export class JuegodelquinceComponent {
  grilla = [
    [1, 1, 1],
    [1, 1, 1],
    [0, 1, 1],
  ];
  esManual:boolean = true;
  movimientos:number = 0;
  stop$ = new Subject<boolean>();
  timer$: Observable<string> | undefined;

  iniciarCronometro() {
    this.timer$ = timer(0, 10).pipe( 
      takeUntil(this.stop$),
      map(t => this.formatearTiempo(t * 10))
    );
  }

  frenarCronometro()
  {
    this.stop$.next(true);
  }

  formatearTiempo(ms: number): string {
    const minutos = Math.floor(ms / 60000);
    const segundos = Math.floor((ms % 60000) / 1000);
    return `${this.formatearNumero(minutos)}:${this.formatearNumero(segundos)}`;
  }

  formatearNumero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  onClick(e: Event): void {
    const unaFicha = e.target as HTMLElement;
    console.log(unaFicha);
    const fila = Number(unaFicha.id[0]);
    console.log(fila);
    const columna = Number(unaFicha.id[1]);
    console.log(columna);

    this.modificarEstadoFichas('none');

    if (columna > 0 && this.grilla[fila][columna - 1] === 0) {
      unaFicha.style.left = unaFicha.offsetLeft - 150 + 'px';
      this.actualizarGrilla([fila, columna], [fila, columna - 1], unaFicha);
    } else if (columna < 2 && this.grilla[fila][columna + 1] === 0) {
      unaFicha.style.left = unaFicha.offsetLeft + 150 + 'px';
      this.actualizarGrilla([fila, columna], [fila, columna + 1], unaFicha);
    } else if (fila > 0 && this.grilla[fila - 1][columna] === 0) {
      unaFicha.style.top = unaFicha.offsetTop - 150 + 'px';
      this.actualizarGrilla([fila, columna], [fila - 1, columna], unaFicha);
    } else if (fila < 2 && this.grilla[fila + 1][columna] === 0) {
      unaFicha.style.top = unaFicha.offsetTop + 150 + 'px';
      this.actualizarGrilla([fila, columna], [fila + 1, columna], unaFicha);
    }

    
    setTimeout(() => {
      this.modificarEstadoFichas('all');
    }, 300);
    if (this.esManual) {
      this.movimientos++;
      this.verificarVictoria();
    }
  }

  actualizarGrilla(from: number[], to: number[], unaFicha: HTMLElement): void {
    const filaActual = from[0];
    const columnaActual = from[1];
    const filaObjetivo = to[0];
    const columnaObjetivo = to[1];

    unaFicha.id = '' + filaObjetivo + columnaObjetivo;
    this.grilla[filaObjetivo][columnaObjetivo] = 1;
    this.grilla[filaActual][columnaActual] = 0;
  }

  mezclar(): void {
    this.movimientos = 0;
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        this.moverAleatorio();
        if(i === 199)
        {
          this.esManual = true;
          this.reactivarTransicion();
        }
      }, 100);
    }
  }

  moverAleatorio(): void {
    const posicionesMovibles: number[][] = [];
    this.esManual = false;
  
    for (let fila = 0; fila < 3; fila++) {
      for (let columna = 0; columna < 3; columna++) {
        if (this.grilla[fila][columna] === 1) {
          if (
            (columna > 0 && this.grilla[fila][columna - 1] === 0) || // izquierda
            (columna < 2 && this.grilla[fila][columna + 1] === 0) || // derecha
            (fila > 0 && this.grilla[fila - 1][columna] === 0) || // arriba
            (fila < 2 && this.grilla[fila + 1][columna] === 0) // abajo
          ) {
            posicionesMovibles.push([fila, columna]);
          }
        }
      }
    }
  
    const indice = Math.floor(Math.random() * posicionesMovibles.length);
    const [fila, columna] = posicionesMovibles[indice];
    const unaFicha = document.getElementById(`${fila}${columna}`) as HTMLElement;

    if (unaFicha) {
      unaFicha.style.transition = 'none';
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      unaFicha.dispatchEvent(event);
    }
  }
  
  verificarVictoria(): void {
    const estadoGanador = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
    ];
      console.log('verificando');
      let ganado = true;
      for (let fila = 0; fila < 3; fila++) {
        for (let columna = 0; columna < 3; columna++) {
          if (this.grilla[fila][columna] !== estadoGanador[fila][columna]) {
            ganado = false;
            break;
          }
        }
      }
  
      if (ganado) {
        console.log('¡Ganaste!');
      }
  }

  reactivarTransicion()
  {
    console.log('reactivadno animacion');
    const fichas = document.querySelectorAll('.ficha');
    fichas.forEach((ficha: Element) => {
      (ficha as HTMLElement).style.transition = 'all .3s';
    });
  }

  modificarEstadoFichas(estado:string)
  {
    const fichas = document.querySelectorAll('.ficha');
    fichas.forEach((ficha: Element) => {
      (ficha as HTMLElement).style.pointerEvents = estado;
    });
  }
}
