import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent implements OnInit {

  formUsers = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',[Validators.required]),
    username: new FormControl('', [Validators.required]),
    password:new FormControl('',[Validators.required]),
    admin:new FormControl('',[Validators.required])
  })

  constructor(private router: Router, public usersService: UsuariosService) { }

  ngOnInit(): void {

    this.usersService.botaoEdit.subscribe(record =>{
      if(record !== null){
        console.log(record, 'valor do record');
        this.formUsers.get('name').setValue(record.name);
        this.formUsers.get('username').setValue(record.username);
        this.formUsers.get('admin').setValue(record.admin);
        this.formUsers.get('password').setValue(record.password);
      }
    });
  }

  limpar(){
    this.formUsers.reset();
  }

  save(){
    if(this.formUsers.valid){
      Swal.fire({
        icon: 'success',
        title: 'Eeeeeba...',
        text:'Usuário criado com sucesso!'
      });
      this.router.navigate(['/lista-usuarios']);
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ooooops',
        text:'Cadastro não realizado, preencha corretamente todos os campos.'
      });
    }
  }

}
