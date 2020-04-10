import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Administrator } from 'src/app/models/administrator';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private httpClient: HttpClient) { }

  private administratorURL = 'http://localhost:8080/administrator';



  getAdministrators() {
    return this.httpClient.get<Administrator[]>(this.administratorURL + `/all`);
  }

  getAdministratorById(id: string) {
    return this.httpClient.get<Administrator>(this.administratorURL + `/${id}`);
  }

  addAdministrator(administrator: Administrator) {
    return this.httpClient.post(this.administratorURL + `/add`, administrator);
  }

  editAdministrator(id: string, administrator: Administrator) {
    return this.httpClient.put(this.administratorURL + `/${id}`, administrator);
  }

  deleteAdministrator(id: string) {
    return this.httpClient.delete(this.administratorURL + `/${id}`);
  }



  


}
