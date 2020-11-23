import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../services/customer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PAYComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<PAYComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private activatedRoute: ActivatedRoute,
              private router: Router, public customerService: CustomerService) { }
  form: FormGroup;
  customer: any;
  stock = {stocktemp: 0};
  movimientoTOTAL = 0;
  movimiento = {total: 0, fecha: new Date() };

  ngOnInit(): void {
    const id = this.data.ident;
    console.log(this.data.ident);
    // tslint:disable-next-line:max-line-length
    this.form = new FormGroup({stocktemp: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d{0,10}$/), Validators.pattern('^[0-9]+')])});
    this.customerService.getCustomerById(id).subscribe( customer => this.customer = customer);

  }
  ngOnDestroy(): void {
    window.location.reload();
  }
  SellAll(): void{
    const id = this.data.ident;
    this.customer.stock = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.customer.movimientos.length; i++ )
    {
      this.movimientoTOTAL = this.movimientoTOTAL + this.customer.movimientos[i].total;

    }
    this.customer.wallet = this.customer.wallet + this.movimientoTOTAL;
    this.movimiento.total = (this.movimientoTOTAL) * -1;
    this.movimiento.fecha = new Date();
    this.customer.movimientos.push(this.movimiento);
    this.customerService.editCustomerById(id, this.customer).subscribe(() => {});
    this.router.navigate(['/customer']);
    window.location.reload();
  }
  SellAmortization(): void{
    if (this.form.valid)
    {
        const id = this.data.ident;
        this.stock.stocktemp = this.form.value.stocktemp;
        if (this.stock.stocktemp <= this.customer.stock)
        {
        this.stock.stocktemp = parseFloat(this.form.value.stocktemp);
        this.customer.stock = this.customer.stock - this.stock.stocktemp;
        // tslint:disable-next-line:radix
        this.customer.wallet = this.customer.wallet + this.stock.stocktemp ;
        this.movimiento.total = (this.stock.stocktemp) * -1;
        this.movimiento.fecha = new Date();
        this.customer.movimientos.push(this.movimiento);
        this.customerService.editCustomerById(id, this.customer).subscribe(() => {});
        this.router.navigate(['/customer']);
        }
    }
  }
  goToBack(): any {
    this.router.navigate(['/customer']);
  }
  get stocktemp() { return this.form.get('stocktemp'); }

}
