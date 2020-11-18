import {Component, Input, OnInit} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrorComponent} from '../dialog-error/dialog-error.component';
import {PAYComponent} from '../pay/pay.component';
import {DialogErrorBuyComponent} from '../dialog-error-buy/dialog-error-buy.component';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: any;
  customer: any;
  displayedColumns: string[] = ['name', 'lastname', 'wallet', 'initialdate', 'endingdate', 'stock', 'icon', 'buttom', 'delete'];
  // tslint:disable-next-line:max-line-length
  constructor(private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.customerService.getCustomer().subscribe(customers =>
      this.customers = customers);
  }
  view(id: any): void {
    this.router.navigate(['/detailscustomers', id]);
  }
  open(id: any): void {
    this.dialog.open(PAYComponent, {data: {cuota: this.customers[id - 1].cuotas, ident: id}});
  }
  buy(id: any): void {
    this.customerService.getCustomerById(id).subscribe(customer => this.customer = customer);
    if (this.customer?.wallet === 0)
    {
      this.dialog.open(DialogErrorBuyComponent);
    }else {
      this.router.navigate(['/products', id]);
    }
  }
  delete(id: any): void {
    this.customerService.deleteCustomerById(id).subscribe(() => {
    });
    window.location.reload();
  }
}

