import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  korisnik: Korisnik = {
    id: '',
    ime: '',
    prezime: '',
    email: '',
    lozinka: '',
    datumRodjenja: null,
    permission: {
      id: '',
      authority: '',
    }
  };

  ngOnInit(): void {
  }


  login() {
    this.authService.login(this.korisnik.email, this.korisnik.lozinka);
    console.log(this.korisnik.email, this.korisnik.lozinka);
    alert('uspesan login');
  }


}
