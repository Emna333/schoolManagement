import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl: string = 'http://localhost:3002/api/contact';

  constructor(private http: HttpClient) {}

  submitContactForm(contactData: any) {
    return this.http.post<{msg:string}>(this.apiUrl, contactData);
  }
}
