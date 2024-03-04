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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'request-queue-number/:id', component: RequestQueueNumberComponent},
  {path: 'input-visitor-details', component: InputVisitorDetailsComponent},
  {path: 'visitor-list', component: VisitorListComponent},
  {path: 'counter-list', component: CounterListComponent},
  {path: 'input-counter', component: InputCounterComponent},
  {path: 'guide', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }