import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Contacts } from 'src/app/models/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  private dataEdit = new BehaviorSubject<Contacts>(null);
  botaoEdit = this.dataEdit.asObservable();
  

  constructor() { }

  getContactsList(contatos: Contacts){
    this.dataEdit.next(contatos);
    
  }

  
    
  

  stop(){
    this.dataEdit.unsubscribe();
  }

  
}
