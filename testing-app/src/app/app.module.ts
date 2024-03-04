import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputVisitorDetailsComponent } from './input-visitor-details/input-visitor-details.component';
import { RequestQueueNumberComponent } from './request-queue-number/request-queue-number.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from './tools/material.module';
import { APP_BASE_HREF } from '@angular/common';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxBarcodeModule } from 'ngx-barcode';
import { HomeComponent } from './home/home.component';
import { CounterListComponent } from './counter-list/counter-list.component';
import { InputCounterComponent } from './input-counter/input-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InputVisitorDetailsComponent,
    RequestQueueNumberComponent,
    VisitorListComponent,
    HomeComponent,
    CounterListComponent,
    InputCounterComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    NgxBarcodeModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
