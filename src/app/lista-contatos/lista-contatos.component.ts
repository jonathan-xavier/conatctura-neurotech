import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '../models/contacts';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss']
})
export class ListaContatosComponent implements OnInit {


  contactList: Contacts[];
  collection = {count:10,data:[]};

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.populateContacts();
  }

  populateContacts(){
    for(let i = 0; i < this.collection.count; i++){
      this.collection.data.push({
        name: 'teste' + i,
        email: 'email' + i + '@contactura.com',
        phone: '('+ 0 +8 + 1 + ')' + 9 + i + i + i + i + '-' + i + i + i + i
      });
    }
    console.log(this.collection.data);
    this.contactList = this.collection.data;
  }

  createContact(){
    this.router.navigate(['/cadastro-contatos']);
  }


}
