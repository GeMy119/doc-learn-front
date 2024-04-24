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
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      email: ['', [Validators.required,Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      isChecked: [false, Validators.requiredTrue]
    });
  }

  goToPayment() {
    // Navigate to payment page
    this.router.navigate(['/payment']);
  }

  initiatePayment() {
    // Set loading to true before initiating payment
    this.loading = true;

    // Save payment data to MongoDB before initiating payment
    const paymentData = {
      firstName: this.paymentForm.value.firstName,
      lastName: this.paymentForm.value.lastName,
      phone: this.paymentForm.value.phone,
      email: this.paymentForm.value.email,
      isChecked: this.paymentForm.value.isChecked, // Add isChecked field
    };

    this.paymentService.savePaymentData(paymentData).subscribe(
      (response) => {
        console.log('Payment data saved:', response);
        // Proceed with payment initiation
        this.paymentService.initiatePayment().subscribe(
          (response) => {
            console.log('Initiate payment response:', response);
            this.iframeURL = response.iframeURL;
            window.location.href = this.iframeURL;
            this.loading = false; // Set loading to false after payment initiation
          },
          (error) => {
            console.error('Error initiating payment:', error);
            this.loading = false; // Set loading to false in case of error
          }
        );
      },
      (error) => {
        console.error('Error saving payment data:', error);
        this.loading = false; // Set loading to false in case of error
      }
    );
  }
}
