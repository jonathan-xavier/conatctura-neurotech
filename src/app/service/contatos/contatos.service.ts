import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contacts } from 'src/app/models/contacts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatosService { 

  constructor(private http: HttpClient) {
    console.log('socorro Deus')
   }

  api_url = environment.api_url;
  private dataEdit = new BehaviorSubject<Contacts>(null);
  botaoEdit = this.dataEdit.asObservable();
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');

   
  getContactsList(contatos: Contacts){
    this.dataEdit.next(contatos);
    
  }
  // stop(){
  //   this.dataEdit.unsubscribe();
  // }

  //pegar contatos
  getContatos(){
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username + ':' +this.password)});
    headers.append('Access-Control-Allow-Origin', 'Content-Type');
    console.log('passou no header')
    //ta dando erro aqui.
    return this.http.get<Contacts[]>(this.api_url + 'contactura',{headers}).pipe(
      map(
        contactData =>{
          if(contactData){
            return contactData;
          }else{
            
            return [];
          }
        }
      )
    );
  }

  //crear contatos
  createContacts(contact: Contacts)
  {
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username + ':' + this.password)});
    return this.http.post<Contacts>(this.api_url + 'contactura', contact, {headers}).pipe(
      map(
        contactData =>{
          if(contactData){
              return contactData;
          }else{
            return [];
          }
        }
      )
    );

  }
  //deletar contatos
  deleteContacts(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.delete(this.api_url + 'contactura/' + id, {headers, responseType: 'text' as 'text'}).pipe(
      map(
        contactData =>
        {
          return contactData;
        }
      )
    );
  }

  //atualizar  contatos
  updateContact(contact: Contacts){
    const id = contact.id;
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    headers.append('Access-Control-Allow-Origin', 'Content-Type');
    return this.http.put<Contacts>(this.api_url + 'contactura/' + id,contact,{headers}).pipe(
      map(
        contactData =>{
          if(contactData){
            return contactData;
          }else{
            return [];
          }
        }
      )
    )
  }

  //fazer amanhã
  findContactById(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username + ':' + this.password)});
    return this.http.get(this.api_url + 'contactura/' + id,{headers}).pipe(
      map(
        contactData =>{
          if(contactData){
            return contactData;
          }else{
            return [];
          }
        }
      )
    );
  }

  
}
