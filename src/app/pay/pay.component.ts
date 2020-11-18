import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../services/customer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PAYComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PAYComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private activatedRoute: ActivatedRoute,
              private router: Router, public customerService: CustomerService) { }
  form: FormGroup;
  customer: any;
  stock = {stocktemp: 0};

  ngOnInit(): void {
    const id = this.data.ident;
    this.form = new FormGroup({stocktemp: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d{0,10}$/)])});
    this.customerService.getCustomerById(id).subscribe( customer => this.customer = customer);
  }
  SellAll(): void{
    const id = this.data.ident;
    this.customer.stock = 0;
    this.customerService.editCustomerById(id, this.customer).subscribe(() => {});
    this.router.navigate(['/customer']);
    window.location.reload();
  }
  SellAmortization(): void{
    const id = this.data.ident;
    this.stock.stocktemp = this.form.value.stocktemp;
    this.customer.stock = this.customer.stock - this.stock.stocktemp;
    this.customerService.editCustomerById(id, this.customer).subscribe(() => {});
    this.router.navigate(['/customer']);
    console.log(this.stock.stocktemp);
    window.location.reload();
  }
  goToBack(): any {
    this.router.navigate(['/customer']);
  }
  get stocktemp() { return this.form.get('stocktemp'); }

}
