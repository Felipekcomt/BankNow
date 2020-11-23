import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../services/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {tasaService} from '../services/tasa.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})

export class CreditoComponent implements OnInit{
    constructor(private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute,
              // tslint:disable-next-line:no-shadowed-variable
                private tasaService: tasaService, private dialog: MatDialog) { }
  form: FormGroup;
  customer: any;
  rate: any;
  ngOnInit(): void {
    this.form = new FormGroup({wallet: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+')])});
    this.retriveCustomer();

  }
  editCustomer(): any {
   const id = this.activatedRoute.snapshot.params.id;
   if ( this.form.valid)
   {
    // tslint:disable-next-line:radix
   this.customer.wallet = this.customer.wallet + parseFloat(this.form.value.wallet);
   this.customer.initialdate = new Date();
   this.customer.endingdate = new Date();
   this.customer.endingdate.setMonth(this.customer.endingdate.getMonth() + 1);
   this.customerService.editCustomerById(id, this.customer).subscribe(() => {});
   this.dialog.open(DialogComponent, {data: {wallet: this.customer.wallet, rate: this.customer.rate}});
    }
  }
  retriveCustomer(): any {
    const id = this.activatedRoute.snapshot.params.id;
    this.customerService.getCustomerById(id).subscribe(customer => this.customer = customer);
    console.log(this.customer);
  }
  goToBack(): any {
    this.router.navigate(['/customer']);
  }
  get wallet() { return this.form.get('wallet'); }
}



