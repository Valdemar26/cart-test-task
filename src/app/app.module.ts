import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from './shared/modules/shared.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      closeButton: true,
      timeOut: 3000
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
