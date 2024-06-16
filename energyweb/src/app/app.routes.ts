import { Routes } from '@angular/router';
import { DistributorComponent } from './pages/cadastros/distributor/distributor.component';
import { FilterDistributorComponent } from './pages/cadastros/filter-distributor/filter-distributor.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'distribuidora', component: FilterDistributorComponent },
    { path: 'distribuidora/cadastro', component: DistributorComponent },
    { path: 'distribuidora/editar/:id', component: DistributorComponent }
];
