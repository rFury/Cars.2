import {
  ApplicationConfig,
  importProvidersFrom,
  APP_INITIALIZER,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    new Promise((resolve, reject) => {
      if (typeof window !== 'undefined') {
        keycloak
          .init({
            config: {
              url: 'http://localhost:8090',
              realm: 'fury-realm',
              clientId: 'car-app',
            },
            initOptions: {
              onLoad: 'check-sso',
              silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html' , 

            },
          })
          .then(() => {
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(true);
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule, HttpClientModule, KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
};
