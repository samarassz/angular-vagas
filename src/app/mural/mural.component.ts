import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { VagasService } from '../vagas.service';
import { Vaga } from '../models/Vagas.model';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css']
})

export class MuralComponent implements OnInit {

  public vaga = {} as Vaga;
  public vagas: Vaga[] = [];

  constructor(private vagaService: VagasService) { }

  ngOnInit() {
    this.getVagas();
  }

  /* TODO
  saveVaga(form: NgForm) {
    if (this.vaga.id !== undefined) {
      this.vagaService.updateVaga(this.vaga).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.vagaService.saveVaga(this.vaga).subscribe(() => {
        this.cleanForm(form);
      });
    }
  } 
  */

  getVagas() {
    this.vagaService.getVagas().subscribe((vagas: Vaga[]) => {
      this.vagas = vagas;
    });
  }

  /* TODO
  deleteVaga(vaga: Vaga) {
    this.vagaService.deleteVaga(vaga).subscribe(() => {
      this.getVagas();
    });
  }

  editVaga(vaga: Vaga) {
    this.vaga = { ...vaga };
  }

  cleanForm(form: NgForm) {
    this.getVagas();
    form.resetForm();
    this.vaga = {} as Vaga;
  } 
  */
}
