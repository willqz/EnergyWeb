import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Distributor } from '../../../interfaces/distributor';
import { DistributorService } from '../../../services/distributor.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-filter-distributor',
  templateUrl: './filter-distributor.component.html',
  styleUrls: ['./filter-distributor.component.css'],
})
export class FilterDistributorComponent implements OnInit {

  page = 1; 
  pageSize = 5; 
  collectionSize = 0; 
  listDistributor: Distributor[] = [];

  constructor(
    private route: Router,
    private distributorService: DistributorService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.distributorService.getAllDistributors().subscribe(
      result => {
        this.listDistributor = result;
        this.collectionSize = result.length;
      }, error => {
        this.showError(error.error);
      }
    );
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

  createNew() {
    this.route.navigate(['distribuidora/cadastro'])
  }

  edit(id: number) {
    this.route.navigate(['distribuidora/editar/', id]);
  }

  deleteDistributor(id: number) {
    Swal.fire({
      title: "Excluir?",
      text: "Você realmente deseja excluir o cadastro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Não"
    }).then((result) => {
      if (result.isConfirmed) {
        this.distributorService.deleteDistributor(id).subscribe(() => {
          Swal.fire({
            title: "Excluído!",
            text: "Cadastro excluido com sucesso.",
            icon: "success"
          });
          this.pesquisar();
        }, error => {
          this.showError(error.error);
        });
      }
    });
  }

  get tableListDistributor(): Distributor[] {
    return this.listDistributor
      .map((appointment, i) => ({ i: i + 1, ...appointment }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
