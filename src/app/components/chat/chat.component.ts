import { Component, inject, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { Timestamp } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardHeader, MatCardFooter, MatCardTitle, MatCardContent, MatFormField, MatIconModule, MatLabel, MatInput, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  firestoreService = inject(FirestoreService);
  nuevoMensaje: string = '';
  mensajes: any = [{}];
  chatMinimizado = true;
  @ViewChild('mensajesContainer') mensajesContainer!: ElementRef;
  mensajesSubscription!: Subscription;

  ngOnInit(): void {
    this.mensajesSubscription = this.firestoreService.getMensajes().subscribe((mensajes) => {
      this.mensajes = mensajes.sort((a, b) => {
        return a.fecha_envio.toDate().getTime() - b.fecha_envio.toDate().getTime();
      });
    });
    console.log('init chat');
  }
  ngOnDestroy(): void {
    if (this.mensajesSubscription) {
      this.mensajesSubscription.unsubscribe();
    }
    console.log('destroy chat');
  }

  EnviarMensaje(){
    console.log(this.nuevoMensaje);
    this.guardarMensaje();
    this.nuevoMensaje = '';
  }

  scrollToBottom(): void {
    try {
      this.mensajesContainer.nativeElement.scrollTop = this.mensajesContainer.nativeElement.scrollHeight;
    } catch (err) {
      //console.error('Error al hacer scroll');
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  guardarMensaje()
  {
    const usuarioActual = this.authService.currentUserSig()!;
    let fecha_envio = new Date();
    this.firestoreService.addMensaje(usuarioActual.uid!, usuarioActual.usuario, this.nuevoMensaje, fecha_envio);
  }
  minimizarChat() {
    this.chatMinimizado = !this.chatMinimizado;
  }
}
