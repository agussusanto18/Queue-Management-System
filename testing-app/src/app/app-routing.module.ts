import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InputVisitorDetailsComponent } from './input-visitor-details/input-visitor-details.component';
import { MenuComponent } from './menu/menu.component';
import { RequestQueueNumberComponent } from './request-queue-number/request-queue-number.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { HomeComponent } from './home/home.component';
import { CounterListComponent } from './counter-list/counter-list.component';
import { InputCounterComponent } from './input-counter/input-counter.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLogin } from './auth-login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'request-queue-number/:id', component: RequestQueueNumberComponent, canActivate: [AuthGuard] },
  { path: 'input-visitor-details', component: InputVisitorDetailsComponent, canActivate: [AuthGuard] },
  { path: 'visitor-list', component: VisitorListComponent, canActivate: [AuthGuard] },
  { path: 'counter-list', component: CounterListComponent, canActivate: [AuthGuard] },
  { path: 'input-counter', component: InputCounterComponent},
  { path: 'guide', component: MenuComponent},
  { path: 'signin', component: LoginComponent, canActivate: [AuthGuardLogin] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
