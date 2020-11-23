import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {FechaService} from '../services/fecha.service';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrorBuyComponent} from '../dialog-error-buy/dialog-error-buy.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  customer: any;
  products: any;
  saldo = 0;
  buyProducts: any = [ ];
  buyProductsTemp: any = [];
  temp: any;
  day: any;
  fecha: any;
  rateTemp: any;
  movimiento = {total: 0, fecha: new Date() };
  tempDelivery: string;
  Delivery: string[] = ['SI', 'NO'];
  form: FormGroup;


  constructor(private customerService: CustomerService, private router: Router
              // tslint:disable-next-line:align
              , private activatedRoute: ActivatedRoute, private productService: ProductService,
              private fechaService: FechaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = new FormGroup({tempDelivery: new FormControl('', [Validators.required])});
    const id = this.activatedRoute.snapshot.params.id;
    this.customerService.getCustomerById(id).subscribe(customer => {this.customer = customer;
                                                                    console.log(this.customer); }
    );
    this.productService.getProduct().subscribe(products => {this.products = products;
                                                            console.log(this.products); }
    );
    this.fechaService.getFechaById(1).subscribe(fecha => this.fecha = fecha);
  }
  buy(id: any): any {
    this.saldo = this.saldo + this.products[id - 1].price;
    this.buyProducts.push(this.products[id - 1]);
    console.log(this.buyProducts);
  }
  cancel(name: any, id: any): any{
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.buyProducts.length; i++ )
    {
      if (this.buyProducts[i].name === name) {
        this.temp = i;
        break;
      }
    }
    console.log(this.temp);
    this.buyProducts.splice(this.temp, 1);
    this.saldo = this.saldo - this.products[id - 1].price;
    console.log(this.buyProducts.indexOf(name));
  }
  Comprar(): any{
    if ( this.form.valid)
    {
      if (this.saldo <= this.customer.wallet)
      {
      const id = this.activatedRoute.snapshot.params.id;
      this.customer.wallet = this.customer.wallet - this.saldo;
      this.fecha = moment(new Date());
      this.day = Math.abs(this.fecha.diff(this.customer.endingdate, 'days'));
      console.log(this.day);
      if (this.customer.tasa === 'TS')
      {
        this.customer.stock = this.customer.stock +  this.saldo * (1 + ( ( this.customer.rate / 100 ) * (this.day / 360)));
      } else {
              if (this.customer.tasa === 'TNA' ){
                this.rateTemp = (Math.pow((1 + ((this.customer.rate / 100) / 360) ), 1) - 1);
              } else if ( this.customer.tasa === 'TEA')
              {
                this.rateTemp = (Math.pow(1 + (this.customer.rate / 100), (1 / 360) ) - 1);
              }
              this.customer.stock = this.customer.stock + this.saldo * (Math.pow(1 + (this.rateTemp), (this.day) ) )  ;
              }
      // tslint:disable-next-line:radix
      if (this.form.value.tempDelivery === 'SI')
        {
          this.customer.stock = this.customer.stock + 7;
          this.customer.wallet = this.customer.wallet - 7;
        }
      this.movimiento.total = this.saldo;
      this.movimiento.fecha = new Date();
      this.customer.movimientos.push(this.movimiento);
      this.customerService.editCustomerById(id, this.customer).subscribe(() => {});
      this.router.navigate(['/customer']);
      } else { this.dialog.open(DialogErrorBuyComponent);
      }
    }
  }
  goToBack(): any {
    this.router.navigate(['/customer']);
  }
}
