import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"saladejuegosferrero-12fef","appId":"1:79579890824:web:90dce5f449b0139aa8cb3d","storageBucket":"saladejuegosferrero-12fef.appspot.com","apiKey":"AIzaSyCmwQ_l6hO17XPE7kst2B343CClIvP4mx0","authDomain":"saladejuegosferrero-12fef.firebaseapp.com","messagingSenderId":"79579890824"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
