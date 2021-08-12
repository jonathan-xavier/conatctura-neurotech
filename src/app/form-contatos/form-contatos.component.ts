
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ContatosService } from '../service/contatos/contatos.service';

@Component({
  selector: 'app-form-contatos',
  templateUrl: './form-contatos.component.html',
  styleUrls: ['./form-contatos.component.scss']
})
export class FormContatosComponent implements OnInit, OnDestroy {

  formContatos = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required])
  });
  constructor(private router: Router, public contatoService: ContatosService) { }
 
 //sub: Subscription;

  sub: Subscription[] = []; 

  ngOnInit(): void {
    //this.contatoService.stop();
   this.sub.push(this.contatoService.botaoEdit.subscribe(record =>{
      if(record !== null){
        console.log(record, 'valor do record');
        this.formContatos.get('name').setValue(record.name);
        this.formContatos.get('phone').setValue(record.phone);
        this.formContatos.get('email').setValue(record.email);
      }
    }))

  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe());
    
    
  }

  resetar(){
   
    this.formContatos.reset();

  }

  save(){
    if(this.formContatos.valid){
      Swal.fire({
        icon: 'success',
        title: 'Eeeeeba...',
        text:'Contato criado com sucesso!'
      });
      this.router.navigate(['/lista-contatos']);
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ooooops',
        text:'Cadastro não realizado, preencha corretamente todos os campos.'
      });
    }
  }

}
