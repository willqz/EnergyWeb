import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributorService } from '../services/distributor.service';
import { FilterDistributorComponent } from '../pages/cadastros/filter-distributor/filter-distributor.component';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FilterDistributorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbPaginationModule,
  ],
  providers: [
    DistributorService
  ],
  exports: [
    FilterDistributorComponent 
  ],
})
export class DistributorModule { }
