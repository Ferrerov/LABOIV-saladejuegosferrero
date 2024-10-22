import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ResultadoInterface } from '../../interfaces/resultado.interface';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Timestamp } from '@angular/fire/firestore';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButton, MatFabButton } from '@angular/material/button';


const ELEMENT_DATA: ResultadoInterface[] = [
  {usuario: 'user1', juego: 'preguntados', puntaje: 10, fecha_jugado: new Timestamp(1000, 1000), orden: 'asc'},
  {usuario: 'user2', juego: 'preguntados', puntaje: 45, fecha_jugado: new Timestamp(1000, 1000), orden: 'asc'},
  {usuario: 'user3', juego: 'mayormenor', puntaje: 222, fecha_jugado: new Timestamp(1000, 1000), orden: 'asc'},
];

@Component({
  selector: 'app-tablapuntaje',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule, MatButton, MatFabButton],
  templateUrl: './tablapuntaje.component.html',
  styleUrl: './tablapuntaje.component.scss'
})
export class TablapuntajeComponent {
  @Input() puntajeRequerido: string = "";
  @Input() ordenPuntos: 'asc' | 'desc' = 'asc';
  @Input() tipoPuntaje: string = "";
  //@ViewChild(MatSort) sort!: MatSort;
  firestore = inject(FirestoreService);
  resultadosSuscripcion!: Subscription;

  displayedColumns: string[] = ['posicion', 'usuario', 'puntaje', 'fecha_jugado'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<ResultadoInterface>;
  @Output() ver = new EventEmitter<any>();

  constructor(){
    this.resultadosSuscripcion = this.firestore.getResultados().subscribe((resultados) => {
      const sortedResultados = resultados.sort((a, b) => {
        if (this.ordenPuntos === 'asc') {
          return a.puntaje - b.puntaje;
        } else {
          return b.puntaje - a.puntaje;
        }
      });
      this.dataSource =  new MatTableDataSource(sortedResultados);
      this.dataSource.filterPredicate = (data: ResultadoInterface, filter: string) => {
        return data.juego === filter;
      };
      this.dataSource.filter = this.puntajeRequerido;
    });
  }

  obtenerResultados(){
    return this.firestore.getResultados();
  }

  cerrarVentana() {
    this.ver.emit(false);
  }
}
