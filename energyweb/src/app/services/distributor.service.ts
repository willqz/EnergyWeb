import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Distributor } from '../interfaces/distributor';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  urlApi = environment.baseUrl;
  //urlApi = 'https://localhost:7007/api/Distributor/';

  constructor(private http: HttpClient) { }
  
  getAllDistributors(): Observable<Distributor[]> {
    const url = `${this.urlApi}GetAllDistributors`;
    return this.http.get<Distributor[]>(url).pipe();
  }

  getDistributor(id: number): Observable<Distributor> {
    const url = `${this.urlApi}GetDistributor?id=${id}`;
    return this.http.get<Distributor>(url).pipe();
  }

  createDistributor(model: any) {
    const url = `${this.urlApi}CreateDistributor`;
    return this.http.post(url, model).pipe();
  }

  editDistributor(model: any) {
    const url = `${this.urlApi}EditDistributor`;
    return this.http.put(url, model).pipe();
  }

  deleteDistributor(id: number) {
    const url = `${this.urlApi}DeleteDistributor?id=${id}`;
    return this.http.delete(url).pipe();
  }

}
