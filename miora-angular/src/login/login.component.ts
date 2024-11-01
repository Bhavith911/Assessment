import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers:[AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  async logIn() {
     this.authService.login(this.username, this.password).subscribe(
      response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        // Redirect or navigate as needed
        this.router.navigate(['/dashboard']);
        alert('Login successful')
      },
      error => {
        console.error('Login failed', error);
        alert('Login unsuccessful')

      }
    );
  }
}
