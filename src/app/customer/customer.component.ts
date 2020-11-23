import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrorComponent} from '../dialog-error/dialog-error.component';
import {PAYComponent} from '../pay/pay.component';
import {DialogErrorBuyComponent} from '../dialog-error-buy/dialog-error-buy.component';
import * as moment from 'moment';
import {DialogErrorPayComponent} from '../dialog-error-pay/dialog-error-pay.component';
import {UserService} from '../services/user.service';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {
  customers: any;
  customerTemp: any;
  displayedColumns: string[] = ['name', 'lastname', 'wallet', 'initialdate', 'endingdate', 'stock', 'icon', 'buttom', 'delete', 'edit'];
  day: any;
  month: any;
  year: any;
  id: any;
  users: any;
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.userService.getUser().subscribe(users => {
      this.users = users;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < (this.users).length; i++)
      { if (this.users[i].islogged === true)
        {
          this.userService.getUserByCustomerId(this.users[i].id).subscribe(customers => {this.customers = customers;
                                                                                             console.log(this.customers);
            for (let j = 0; j < this.customers?.length; j++)
            {
              this.day = moment(this.customers[j].endingdate).diff(new Date(), 'days');
              this.month = moment(new Date()).diff(this.customers[j].endingdate, 'months');
              this.year =  moment(new Date()).diff(this.customers[j].endingdate, 'years');
              if (this.day < 0 && this.month === 0 && this.year === 0 )
              {
                console.log(this.customers[j].endingdate);
                this.customers[j].wallet = this.customers[j].wallet - 7;
                this.customers[j].endingdate = new Date();
                this.customers[j].endingdate.setMonth(  this.customers[j].endingdate.getMonth() + 1);
                this.customerService.editCustomerById(this.customers[j].id, this.customers[j]).subscribe(() => {});
              }
            }
          });
        }
      };
    });
  }
  ngOnDestroy(): void {
    window.location.reload();
  }
  view(id: any): void {
    console.log(this.customers);
    this.router.navigate(['/detailscustomers', id]);
  }
  open(id: any): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.customers?.length; i++) {
      if (id === this.customers[i].id) {
        if (this.customers[i].stock === 0) {
          this.dialog.open(DialogErrorPayComponent);
        } else {
          this.dialog.open(PAYComponent, {data: { ident: id}});
        }
      }
    }

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
  edit(id: any): void{
    this.router.navigate(['/editcustomer', id]);
  }
}

