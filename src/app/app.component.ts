import { Component, OnInit } from '@angular/core';
import {
  RouterModule,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { AuthService } from './Services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './Services/token.interceptor';
import { filter } from 'rxjs/operators';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AppComponent implements OnInit{
  title = 'agular_Keycloak_depart';

  public profile? : KeycloakProfile;

  constructor(public keycloakService : KeycloakService) {
  }

  ngOnInit() {
      let res = this.keycloakService.isLoggedIn();
    console.log("res "+res) ;
      if (res)
    this.keycloakService.loadUserProfile().then(profile=>{
           this.profile=profile;
          });
    
  }

  onLogout() {
    this.keycloakService.logout(window.location.origin);
  }

  async onLogin() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }
  
}
