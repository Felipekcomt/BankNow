import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(private customerService: CustomerService, private router: Router ) { }
  form: FormGroup;
  tempTasa: string;
  ListTasas: string[] = ['TEA', 'TNA', 'TS'];
  customer = {name: '', lastname: '', dni: 0 , celular: 0, wallet: 0, cuotas: 0, topay: 0,
    stock: 0, tasa: '', rate: 0, initialdate: new Date(), endingdate: new Date()};
  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    this.form = new FormGroup({name: new FormControl('', [Validators.required, Validators.minLength(3)]), lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      // tslint:disable-next-line:max-line-length
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]\d{0,10}$/)]), celular: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]\d{0,10}$/)]),
    rate: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d{0,10}$/)])});
  }
  createCustomer(): any{
    this.customer.name = this.form.value.name;
    this.customer.lastname = this.form.value.lastname;
    this.customer.dni = this.form.value.dni;
    this.customer.celular = this.form.value.celular;
    this.customer.tasa = this.tempTasa;
    // tslint:disable-next-line:radix
    this.customer.rate = parseInt(this.form.value.rate);
    this.customer.initialdate = null;
    this.customer.endingdate = null;
    this.customerService.createCustomer(this.customer).subscribe(() => {});
    this.router.navigate(['/customer']);
  }
  Validation(): any {
    if (this.form.valid)
    {this.createCustomer();
    }
  }
  goToBack(): any {
    this.router.navigate(['/customer']);
  }
  get name() { return this.form.get('name'); }
  get lastname() { return this.form.get('lastname'); }
  get dni() { return this.form.get('dni'); }
  get celular() { return this.form.get('celular'); }
  get rate() {return this.form.get('rate'); }


}
