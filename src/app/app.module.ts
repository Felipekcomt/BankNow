import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {routes} from './routes';
import {RouterModule} from '@angular/router';
import {CustomerComponent} from './customer/customer.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CardsComponent } from './cards/cards.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DetailsCustomersComponent } from './details-customers/details-customers.component';
import { CreditoComponent } from './credito/credito.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatInputModule} from '@angular/material/input';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { PAYComponent } from './pay/pay.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import {MatRadioModule} from '@angular/material/radio';
import { ProductsComponent } from './products/products.component';
import { DialogErrorBuyComponent } from './dialog-error-buy/dialog-error-buy.component';
import { TerminosComponent } from './terminos/terminos.component';
import { DialogErrorPayComponent } from './dialog-error-pay/dialog-error-pay.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DialogErrosRegisterComponent } from './dialog-erros-register/dialog-erros-register.component';
import { DialogErrorLoginComponent } from './dialog-error-login/dialog-error-login.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';



@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    HomeComponent,
    CardsComponent,
    DetailsCustomersComponent,
    CreditoComponent,
    DialogComponent,
    DialogErrorComponent,
    PAYComponent,
    AddCustomerComponent,
    ProductsComponent,
    DialogErrorBuyComponent,
    TerminosComponent,
    DialogErrorPayComponent,
    RegisterComponent,
    LoginComponent,
    DialogErrosRegisterComponent,
    DialogErrorLoginComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, DialogErrorComponent, PAYComponent, DialogErrorBuyComponent, DialogErrorPayComponent, DialogErrosRegisterComponent, DialogErrorLoginComponent]
})
export class AppModule { }
export class MenuPositionExample {}
