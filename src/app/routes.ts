import {Routes} from '@angular/router';
import {CustomerComponent} from './customer/customer.component';
import {CardsComponent} from './cards/cards.component';
import {DetailsCustomersComponent} from './details-customers/details-customers.component';
import {CreditoComponent} from './credito/credito.component';
import {AddCustomerComponent} from './add-customer/add-customer.component';
import {ProductsComponent} from './products/products.component';
import {TerminosComponent} from './terminos/terminos.component';

export const routes: Routes = [
  {path: '', component: CardsComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'detailscustomers/:id', component: DetailsCustomersComponent},
  {path: 'credito/:id', component: CreditoComponent},
  {path: 'addcustomer', component: AddCustomerComponent},
  {path: 'products/:id', component: ProductsComponent},
  {path: 'terminos', component: TerminosComponent}
];
