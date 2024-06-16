import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DistributorModule } from '../../../distributor/distributor.module';
import Swal from 'sweetalert2'
import { DistributorService } from '../../../services/distributor.service';


@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    DistributorModule,
    RouterOutlet,
    NgbModule,
    ReactiveFormsModule,
  ]
})
export class DistributorComponent implements OnInit {

  id = 0;
  
  createForm = new FormGroup({
    formDescription: new FormControl('', Validators.required),
    formCode: new FormControl('', Validators.required),
    formActive: new FormControl('1', Validators.required),
  });

  options = [
    { id: '1', name: "Ativo" },
    { id: '2', name: "Inativo" },
  ];
  
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private distributorService: DistributorService
  ) {  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: params => {
        const idParam = params.get('id');
        this.id = idParam ? parseInt(idParam, 0) || 0 : 0;
      }
    });  

    this.getValues();
  }

  getValues() {
    if(this.id > 0) {
      this.distributorService.getDistributor(this.id).subscribe(distributor => {
        this.createForm.controls.formDescription.setValue(distributor.description?.toString());
        this.createForm.controls.formCode.setValue(distributor.code?.toString());
        this.createForm.controls.formActive.setValue(distributor.active === true ? '1' : '2');
      }, error => {
        this.showError(error.error);
      });
    }
  }

  back() {
    this.route.navigate(['distribuidora'])
  }

  showError(message: string) {
    let msg = "Ops! Algo de errado aconteceu. =S";
    if (message) {
      msg = message;
    }

    Swal.fire({
      title: 'OPS!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  showSuccessMessage(message: string) {
    Swal.fire({
      title: 'Sucesso!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  onSubmit() {   
    if(!this.createForm.valid) {
      this.showError('Preencha todos os campos obrigatórios. =S');
      return;
    }

    if (this.id == 0) { 
      this.saveCreate();
    } else {
      this.saveEdit();
    }
  }

  returnStatus() : boolean {
    return this.createForm.controls.formActive.value?.toString() == '1' ? true : false
  }

  saveCreate() {
    debugger;
    const model = {
      description: this.createForm.controls.formDescription.value?.toString(),
      code: this.createForm.controls.formCode.value?.toString(),
      active: this.returnStatus(),
    };

    this.distributorService.createDistributor(model).subscribe(() => {
      this.showSuccessMessage('Cadastro realizado com sucesso');
      this.back();
    }, error => {
      this.showError(error.error);
    });
  }

  saveEdit() {
    const model = {
      id: this.id,
      description: this.createForm.controls.formDescription.value?.toString(),
      code: this.createForm.controls.formCode.value?.toString(),
      active: this.returnStatus(),
    };

    this.distributorService.editDistributor(model).subscribe(() => {
      this.showSuccessMessage('Registro atualizado com sucesso');
      this.back();
    }, error => {
      this.showError(error.error);
    });
  }
}
