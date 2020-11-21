import {Component, Input, OnInit} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrorComponent} from '../dialog-error/dialog-error.component';
import {PAYComponent} from '../pay/pay.component';
import {DialogErrorBuyComponent} from '../dialog-error-buy/dialog-error-buy.component';
import * as moment from 'moment';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: any;
  customer: any;
  displayedColumns: string[] = ['name', 'lastname', 'wallet', 'initialdate', 'endingdate', 'stock', 'icon', 'buttom', 'delete'];
  day: any;
  month: any;
  year: any;
  // tslint:disable-next-line:max-line-length
  constructor(private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.customerService.getCustomer().subscribe(customers => {
      this.customers = customers;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < (this.customers).length; i++)
      {
        this.day = moment(this.customers[i].endingdate).diff(new Date(), 'days');
        this.month = moment(new Date()).diff(this.customers[i].endingdate, 'months');
        this.year =  moment(new Date()).diff(this.customers[i].endingdate, 'years');
        if (this.day < 0 && this.month === 0 && this.year === 0 )
        {
          console.log(this.customers[i].endingdate);
          this.customers[i].wallet = this.customers[i].wallet - 7;
          this.customers[i].endingdate = new Date();
          this.customers[i].endingdate.setMonth(  this.customers[i].endingdate.getMonth() + 1);
          this.customerService.editCustomerById(this.customers[i].id, this.customers[i]).subscribe(() => {});
        }
      };
    });
  }
  view(id: any): void {
    console.log(this.customers);
    this.router.navigate(['/detailscustomers', id]);
  }
  open(id: any): void {
    this.dialog.open(PAYComponent, {data: { ident: id}});
  }
  buy(id: any): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.customers?.length; i++)
    {
      if (id === this.customers[i].id)
      {
        if (this.customers[i].wallet < 0)
        {
          this.dialog.open(DialogErrorBuyComponent);
        }else {
          this.router.navigate(['/products', id]);
        }
      }
    }
  }
  delete(id: any): void {
    this.customerService.deleteCustomerById(id).subscribe(() => {
    });
    window.location.reload();
  }
}

