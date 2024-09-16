import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData,setDoc, DocumentData, doc } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  formbuilder = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  hide = signal(true);
  errorFirebase : string | null = null;

  form = this.formbuilder.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['',[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),Validators.minLength(8),],]
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() : void{
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.correo ,rawForm.contrasena)
    .subscribe({
      next: () => {console.log('login exitoso'); this.router.navigateByUrl('/home');},
      error: (err) => {
        console.log(err.code);
        switch (err.code) {
          case 'auth/email-already-in-use': this.errorFirebase = 'El correo ingresado ya existe';
          break;
          case 'auth/invalid-email': this.errorFirebase = 'El correo ingresado no es valido';
          break;
          default: 'Error al registrarse'
        }
      }
    });
  }
}
