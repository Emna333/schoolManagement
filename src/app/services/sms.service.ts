
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  constructor(private http: HttpClient) {}

  sendSMS(to: string, message: string): Observable<any> {
   let smsData = {
      to: to,
      message: message
    };

    return this.http.post<any>('http://localhost:3002/api/send-sms', smsData);
  }
}