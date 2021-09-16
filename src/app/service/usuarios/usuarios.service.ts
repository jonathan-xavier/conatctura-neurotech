import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Authentication, StorageInfo, User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  private dataEdit = new BehaviorSubject<User>(null);
  botaoEdit = this.dataEdit.asObservable();
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');

  constructor(private http: HttpClient) { }



  getUsersList(users: User){
    this.dataEdit.next(users);
  }

  api_url = environment.api_url;
  //autenticação de login do usuário
  authentication(authentication: Authentication){
    const headers = new HttpHeaders ({Authorization: 'Basic ' + 
    btoa(authentication.username + ':' + authentication.password)});

    // headers.append('Access-Control-Allow-Origin', 'Content-Type');
    //return this.http.get(this.api_url + 'user/login',{headers, responseType:'text' as 'text'}).pipe(
      return this.http.get(this.api_url + 'user/login',{headers}).pipe(
      map(
        authData =>{
          let storageInformation: StorageInfo = {
            admin: authData[0],
            token: authData[1]
          }
          console.log(storageInformation);
          return storageInformation;
        }
      )
    );
  }

  //pegar usuarios do banco
  getUsuarios(){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.get<User[]>(this.api_url + 'user',{headers}).pipe(
      map(
        userData =>{
          if(userData){
            return userData;
          }else
          {
            return [];
          }
        }
      )
    );
  }
  //criar um novo usuario
  createUsers(user: User){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.post<User>(this.api_url + 'user', user, {headers}).pipe(
      map(
        userData =>{
          if(userData){
            return userData;
          }else{
            return [];
          }
        }
      )
    );
  }

  //deletar usuario
  deleteUser(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.delete(this.api_url + 'user/' + id, {headers}).pipe(
      map(
        userData =>{
          return userData;
        }
      )
    );
  }

  //atualizar usuario
  updateUser(user: User){
    const id = user.id;
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(this.username + ':' + this.password)});
    return this.http.put<User>(this.api_url + 'user', user, {headers}).pipe(
      map(
        userData =>{
          if(userData){
              return userData;
          }else{
            return [];
          }
        }
      )
    );
  }
}
