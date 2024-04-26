import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../environments/environment"

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  transactionData: any; // Define a property to hold the payment data
  dataReceived: boolean = false; // Track if data is received
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Extract transaction data from query parameters
      this.transactionData = params;
      console.log('Transaction data from Paymob:', this.transactionData);
      if (this.transactionData) {
        this.dataReceived = true; // Set dataReceived to true
        this.fetchTransactionData();
      } else {
        this.dataReceived = false; // Set dataReceived to false
      }
    });
  }

  // Method to fetch the payment data
  fetchTransactionData(): void {
    // Make an HTTP POST request to fetch the payment data from the server
    this.http.post<any>(`${environment.backEndUrl}/callback`, this.transactionData)
      .subscribe(
        (response) => {
          // Handle the response data here
          console.log(response)
        },
        (error) => {
          console.error('Error fetching payment data:', error);
        }
      );
  }
  navigateToExam() {
    // Navigate to the exam page
    this.router.navigate(['/exam']);
  }

  navigateToPayment() {
    // Navigate to the payment page
    this.router.navigate(['/payment']);
  }
}
