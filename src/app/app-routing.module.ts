import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseExamComponent } from './components/choose-exam/choose-exam.component';
import { ExamComponent } from './components/exam/exam.component';
import { PaymentComponent } from './payment/payment.component';
import { ChooseExamTypeComponent } from './components/choose-exam-type/choose-exam-type.component';
import { ExamEndRoundComponent } from './components/exam-end-round/exam-end-round.component';
import { ChooseFacultyComponent } from './components/choose-faculty/choose-faculty.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { AboutComponent } from './components/about/about.component';
import { PaymentNewComponent } from './components/payment-new/payment-new.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component'
import { AuthGuard } from './auth.guard';
import { YoutubePageComponent } from './components/youtube-page/youtube-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'choose', component: ChooseExamComponent, canActivate: [AuthGuard] },
  { path: 'exam', component: ExamComponent, canActivate: [AuthGuard] },
  { path: 'payment-final', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'examType', component: ChooseExamTypeComponent, canActivate: [AuthGuard] },
  { path: 'exam-end-round', component: ExamEndRoundComponent, canActivate: [AuthGuard] },
  { path: 'faculty', component: ChooseFacultyComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentNewComponent, canActivate: [AuthGuard] },
  { path: 'termsAndConditions', component: TermsAndConditionsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'paymentStatus', component: PaymentStatusComponent, canActivate: [AuthGuard] },
  { path: 'videos', component: YoutubePageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
