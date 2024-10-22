import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AuthService } from './services/auth.service';
import { OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Sala de Juegos - Ferrero';
  authService = inject(AuthService);
  usuarioActual:string | null = null;

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User | null) =>{
      if(user)
      {
        this.authService.currentUserSig.set({
          correo: user.email!,
          usuario: user.displayName!,
          uid: user.uid!
        });
        this.usuarioActual = user.displayName;
      }
      else
      {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }

  
}
