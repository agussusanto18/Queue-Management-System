import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InputVisitorDetailsComponent } from './pages/input-visitor-details/input-visitor-details.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RequestQueueNumberComponent } from './pages/request-queue-number/request-queue-number.component';
import { VisitorListComponent } from './pages/visitor-list/visitor-list.component';
import { HomeComponent } from './pages/home/home.component';
import { CounterListComponent } from './pages/counter-list/counter-list.component';
import { InputCounterComponent } from './pages/input-counter/input-counter.component';
import { LoginComponent } from './pages/login/login.component';
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
