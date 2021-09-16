import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { User } from '../models/user';



@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent implements OnInit {

  user: User = null;
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
        this.user = record;
        console.log(record, 'valor do record');
        this.formUsers.get('name').setValue(record.name);
        this.formUsers.get('username').setValue(record.username);
        this.formUsers.get('admin').setValue(record.admin);
        this.formUsers.get('password').setValue(record.password);
      }
    });
  }

  validation(){
    console.log('entrou no validation');
    if(this.formUsers.valid){
      if(this.user){
        this.updateUser(this.user);
      }else{
        this.save();
      }
    }
  }

  limpar(){
    this.formUsers.reset();
  }

  save(){
    if(this.formUsers.valid){
      this.user = this.formUsers.value;
      this.usersService.createUsers(this.user).subscribe(
        data =>{
          Swal.fire({
            icon: 'success',
            title: 'Eeeeeba...',
            text:'Usuário criado com sucesso!'
          });
          this.router.navigate(['/lista-usuarios']);
        }
      );
      
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ooooops',
        text:'Cadastro não realizado, preencha corretamente todos os campos.'
      });
    }
  }

  updateUser(user:User){
    if(this.formUsers.valid && this.user.id != null){
      user.name = this.formUsers.get('name').value;
      user.username = this.formUsers.get('username').value;
      user.admin = this.formUsers.get('admin').value;
      user.password = this.formUsers.get('password').value;
      this.usersService.updateUser(user).subscribe(
        data=>{
          Swal.fire({
            icon: 'success',
            title: 'Eeeeeba...',
            text:'Usuário criado com sucesso!'
          });
          this.router.navigate(['/lista-usuarios']);
        },
        error => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao editar contato',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ooooops',
        text:'Edição não realizada, preencha corretamente todos os campos.'
      });
    }
    
  }

}
