import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputVisitorDetailsComponent } from './pages/input-visitor-details/input-visitor-details.component';
import { RequestQueueNumberComponent } from './pages/request-queue-number/request-queue-number.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MaterialModule } from './tools/material.module';
import { APP_BASE_HREF } from '@angular/common';
import { VisitorListComponent } from './pages/visitor-list/visitor-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxBarcodeModule } from 'ngx-barcode';
import { HomeComponent } from './pages/home/home.component';
import { CounterListComponent } from './pages/counter-list/counter-list.component';
import { InputCounterComponent } from './pages/input-counter/input-counter.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLogin } from './auth-login.guard';
import { JwtInterceptor } from './jwt.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/reducers'
import { AuthEffects } from './store/effects'
import { StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage'


// Create a meta reducer to sync state with local storage
export function localStorageSyncReducer(reducer) {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true,
  })(reducer);
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InputVisitorDetailsComponent,
    RequestQueueNumberComponent,
    VisitorListComponent,
    HomeComponent,
    CounterListComponent,
    InputCounterComponent,
    LoginComponent
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
    NgxBarcodeModule,
    StoreModule.forRoot({ auth: authReducer }, { metaReducers: [localStorageSyncReducer] }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [
    AuthGuard,
    AuthGuardLogin,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }