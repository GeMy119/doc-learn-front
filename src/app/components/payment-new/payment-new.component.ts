import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/payment/services/payment.service';

@Component({
  selector: 'app-payment-new',
  templateUrl: './payment-new.component.html',
  styleUrls: ['./payment-new.component.css']
})
export class PaymentNewComponent implements OnInit {
  student: any = {};
  agreeTerms: boolean = false;
  iframeURL: string = "";
  loading: boolean = false; // Add loading variable
  paymentForm!: FormGroup;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      isChecked: [false, Validators.requiredTrue]
    });
  }

  goToPayment() {
    // Navigate to payment page
    this.router.navigate(['/payment']);
  }

  initiatePayment() {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found in localStorage');
      // Handle the case where token is not found
      // For example, you can redirect the user to the login page
      // or display an error message to inform the user
      return;
    }

    this.paymentService.initiatePayment(token).subscribe(
      (response) => {
        console.log('Initiate payment response:', response);
        this.iframeURL = response.iframeURL;
        window.location.href = this.iframeURL;
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Client-side error occurred
          console.error('An error occurred:', error.error.message);
          // Handle client-side error
        } else {
          // Backend returned an unsuccessful response code
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`
          );
          // Handle backend error
          // For example, display an error message to the user
        }
      }
    );
  }
}
