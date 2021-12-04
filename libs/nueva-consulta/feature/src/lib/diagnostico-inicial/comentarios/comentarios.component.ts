import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'consultas-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  formControl!: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  buildFormControl(){
    this.formControl = this.formBuilder.control({formState: ''});
  }

}
