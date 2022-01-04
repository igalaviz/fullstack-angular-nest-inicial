import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'consultas-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {
  formControl!: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  buildFormControl(){
    this.formControl = this.formBuilder.control({formState: ''});
  }

}
