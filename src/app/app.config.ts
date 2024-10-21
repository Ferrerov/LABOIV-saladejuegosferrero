import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyCmwQ_l6hO17XPE7kst2B343CClIvP4mx0",
  authDomain: "saladejuegosferrero-12fef.firebaseapp.com",
  projectId: "saladejuegosferrero-12fef",
  storageBucket: "saladejuegosferrero-12fef.appspot.com",
  messagingSenderId: "79579890824",
  appId: "1:79579890824:web:90dce5f449b0139aa8cb3d"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),provideHttpClient()]
};
