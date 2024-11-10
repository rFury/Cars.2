import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth-service.service';
import { User } from '../Model/User.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  user = new User();
  err : number = 0;

  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin()
    {
      this.authService.login(this.user).subscribe({
        next: (data) => {
          let jwToken = data.headers.get('Authorization')!;
         
          this.authService.saveToken(jwToken);
           this.router.navigate(['/']); 
        },
        error: (err: any) => {
          console.log("err "+err.message);
        this.err = 1; 
        }
        });
        
        
    }

    

}
