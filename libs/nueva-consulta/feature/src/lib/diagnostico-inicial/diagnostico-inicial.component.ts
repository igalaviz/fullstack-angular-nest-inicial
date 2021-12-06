import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'consultas-diagnostico-inicial',
  templateUrl: './diagnostico-inicial.component.html',
  styleUrls: ['./diagnostico-inicial.component.scss']
})
export class DiagnosticoInicialComponent{
  constructor(private router: Router){}
  onNextClicked(){
    this.router.navigateByUrl('/new/tratamientos');
  }

}
