import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  createUser(){
    this.route.navigate(['/cadastro-usuarios']);
  }

}
