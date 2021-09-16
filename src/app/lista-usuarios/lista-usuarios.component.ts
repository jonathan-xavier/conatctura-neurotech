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

  userList: User[] = [];
  filteredUsers: User[] = [];
  filterBy: string = "";
  collection = {count:10,data:[]};

  constructor(private route: Router, public usersService: UsuariosService ) { }

  ngOnInit(): void {
    //this.populateUsers();
    this.getUsers();
  }

  createUser(){
    this.route.navigate(['/cadastro-usuarios']);
  }

  // populateUsers(){
  //   for(let i = 0; i < this.collection.count; i++){
  //     this.collection.data.push({
  //       name: 'teste' + i,
  //       username: 'email' + i + '@contactura.com',
  //       password: `819${i+i+i+i+i+i+i+i}`,
  //       admin: true,
        
  //     });
  //   }
  //   console.log(this.collection.data);
  //   this.userList = this.collection.data;
  // }

  //buscar usuarios
  getUsers(){
    this.usersService.getUsuarios().subscribe(
      data =>{
        this.userList = data;
        this.filteredUsers = this.userList;
        
      },
      error =>{
        this.userList = [];
        console.log(error);
      }
    )
  }

  set filter(value:string){
    this.filterBy = value;
    this.filteredUsers = this.userList.filter((user: User)=>{
      return user.name.toLocaleLowerCase()
      .indexOf(this.filterBy.toLocaleLowerCase()) > -1
    });
  }
  get filter(){
    return this.filterBy;
  }

  //criar ususarios
  createUsers(){
    this.route.navigate(['/cadastro-usuarios']);
  }


  editUsers(users:User){
    console.log('edit está funcionando', users);
    this.usersService.getUsersList(users);
    //add essa linha
    this.usersService.updateUser(users);
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
        this.usersService.deleteUser(users.id).subscribe(
          data =>{
            Swal.fire(
              //'Deletado com sucesso!'
              String(data),
            );
            this.getUsers();
          }
        );
        
      }
    })
  }



}
