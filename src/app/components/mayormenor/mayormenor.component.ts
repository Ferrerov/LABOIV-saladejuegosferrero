import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [MatCard, MatButton, MatFabButton, MatIcon],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.scss'
})
export class MayormenorComponent {

}
