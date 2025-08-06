import { Component } from '@angular/core';
import axiosInstance from '../api/axiosInstance'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

constructor(private router: Router) {}

  async onLogin() {
    if (!this.username || !this.password) return;

    try {
      const response = await axiosInstance.post('/user/login', { username: this.username, password: this.password, });

      console.log('login successfullll', response.data);
    this.router.navigate(['/home']);


    } catch (error: any) {
      console.error( error.response?.data || error.message);
      alert('login failed-');
    }
  }
}
