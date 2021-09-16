import { compilePipeFromMetadata } from '@angular/compiler';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '../models/contacts';
import { ContatosService } from '../service/contatos/contatos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss']
})
export class ListaContatosComponent implements OnInit {


  contactList: Contacts[] = [];
  filteredContacts: Contacts[] = [];
  filterBy: string = "";
  //collection = {count:10,data:[]};

  constructor(private router: Router, public contatosService: ContatosService) { }
  


  ngOnInit(): void {
    
    //this.populateContacts();
    this.getContacts();
    
  }

  getContacts(){
    this.contatosService.getContatos().subscribe(
      data =>{
        this.contactList = data;
        this.filteredContacts = this.contactList;
        console.log(data);
      },
      error =>
      {
        // Swal.fire({
        //   title: 'Ooops!',
        //   text: 'Erro ao retornar lista',
        //   icon: 'error',
        //   confirmButtonText: 'Okay'
        // });
        this.contactList = [];
        console.log(error);
      }
    );
  }

  set filter(value: string){
    this.filterBy = value;
    this.filteredContacts = this.contactList.filter((contact: Contacts) =>{
        return contact.email.toLocaleLowerCase()
        .indexOf(this.filterBy.toLocaleLowerCase())> -1 });
        console.log(this.filteredContacts);
  }

  get filter(){
    return this.filterBy;
  }


  // populateContacts(){
  //   for(let i = 0; i < this.collection.count; i++){
  //     this.collection.data.push({
  //       name: 'teste' + i,
  //       email: 'email' + i + '@contactura.com',
  //       phone: '('+ 0 +8 + 1 + ')' + 9 + i + i + i + i + '-' + i + i + i + i
  //     });
  //   }
  //   console.log(this.collection.data);
  //   this.contactList = this.collection.data;
  // }

  createContact(){
    
    this.router.navigate(['/cadastro-contatos']);
  }
  createUser(){
    this.router.navigate(['/cadastro-usuarios']);
  }

  editContacts(contatos: Contacts){
    
    console.log('edit está funcionando', contatos);
    this.contatosService.getContactsList(contatos);
    //this.contatosService.updateContact(contatos);
    this.router.navigate(['/cadastro-contatos']);
  }  

  deleteContacts(contatos: Contacts){
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
        this.contatosService.deleteContacts(contatos.id).subscribe(
          data =>{
            Swal.fire(
              String(data),
            );
            this.getContacts();
          }
        )
        
      }
    });
  }

}
