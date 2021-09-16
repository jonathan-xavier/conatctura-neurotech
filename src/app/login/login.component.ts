import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Authentication } from '../models/user';
import { UsuariosService } from '../service/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  authentication: Authentication;

  constructor(private router: Router, public usuariosService: UsuariosService) { }

  ngOnInit(): void {
    //C700C7
    document.querySelector('html').style.background =
      'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(199,0,199,1) 50%, rgba(252,176,69,1) 100%)';
  }

  ngOnDestroy(): void {
    document.querySelector('html').style.background = 'none';
  }

  login() {
    if (this.loginform.valid) {
      this.authentication = this.loginform.value;
      this.usuariosService.authentication(this.authentication).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('admin', data.admin);
          //faltava eu setar no localstorage o username e o password.
          localStorage.setItem('username', this.authentication.username);
          localStorage.setItem('password', this.authentication.password);
          this.router.navigate(['/lista-contatos'])
        }
      );
      

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login ou senha inválidos.'
      })
    }
  }





}
