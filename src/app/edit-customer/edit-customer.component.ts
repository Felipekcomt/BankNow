import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService,private router: Router) { }
  form: FormGroup;
  customer = {celular: 0, rate: 0 };
  customerTemp: any;
  ListTasas: string[] = ['TEA', 'TNA', 'TS'];
  tempTasa: string;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    // tslint:disable-next-line:max-line-length
    this.form = new FormGroup({celular: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]\d{0,10}$/)]),
      rate: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d{0,10}$/)])});
    this.customerService.getCustomerById(id).subscribe(customerTemp => {this.customerTemp = customerTemp; } );
  }
  Validation(): void{
    const id = this.activatedRoute.snapshot.params.id;
    this.customerTemp.celular = this.form.value.celular;
    this.customerTemp.rate = this.form.value.rate;
    this.customerTemp.tasa = this.tempTasa;
    this.customerService.editCustomerById(id, this.customerTemp).subscribe(() => {});
    this.router.navigate(['/customer']);
  }
  goToBack(): void{
    this.router.navigate(['/customer']);
  }
  get celular() { return this.form.get('celular'); }
  get rate() {return this.form.get('rate'); }

}
