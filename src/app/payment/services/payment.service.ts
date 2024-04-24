import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://doc-lern.vercel.app';

  constructor(private http: HttpClient) { }

  initiatePayment(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/initiatePayment`, {});
  }

  savePaymentData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/savePaymentData`, data);
  }
}
