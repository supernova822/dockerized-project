import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  // Instanciamos el usuario para iniciar sesion
  public user = new User();
  public sessionStatus: boolean;
  public username: string;

  constructor(
    private auth: AuthService
  ) {
    this.observeSessionStatusChanges();
  }

  ngOnInit() {
    this.sessionStatus = this.auth.isAuthenticated();
    if (this.sessionStatus) {
      this.username = localStorage.username;
    }
  }

  public doLogin() {
    this.auth.login(this.user).subscribe(
      (token: any) => {
        localStorage.setItem('token', token.key);
        localStorage.setItem('username', this.user.username);
        this.username = this.user.username;
        // Notifica a todos los observadores que la sesion fue iniciada
        this.auth.changeSesionStatus(true);
        this.getMe();
      }
    );
  }

  public doLogout() {
    this.auth.logout().subscribe(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        this.user = new User();
        // Notifica a todos los observadores que la sesion fue cerrada
        this.auth.changeSesionStatus(false);
      }
    );
  }

  private observeSessionStatusChanges() {
    this.auth.observeSessionStatusChanges().subscribe(
      (value: boolean) => this.sessionStatus = value
    );
  }

  private getMe() {
    this.auth.getMe().subscribe(
      (me: User) => {
        localStorage.setItem('userId', me.pk.toString());
      }
    );
  }

}
