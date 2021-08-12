import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UsuariosService } from '../service/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  userList: User[];
  collection = {count:10,data:[]};

  constructor(private route: Router, public usersService: UsuariosService ) { }

  ngOnInit(): void {
    this.populateUsers();
  }

  createUser(){
    this.route.navigate(['/cadastro-usuarios']);
  }

  populateUsers(){
    for(let i = 0; i < this.collection.count; i++){
      this.collection.data.push({
        name: 'teste' + i,
        username: 'email' + i + '@contactura.com',
        password: `819${i+i+i+i+i+i+i+i}`,
        admin: true,
        
      });
    }
    console.log(this.collection.data);
    this.userList = this.collection.data;
  }

  editUsers(users:User){
    console.log('edit está funcionando', users);
    this.usersService.getUsersList(users);
    this.route.navigate(['/cadastro-usuarios']);
  }

  deleteUsers(users: User){
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Deseja mesmo deletar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deletado com sucesso!'
        )
      }
    })
  }



}
