import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit, OnDestroy {

  constructor(private customerService: CustomerService, private router: Router, private  userService: UserService) { }
  form: FormGroup;
  users: any;
  tempTasa: string;
  ListTasas: string[] = ['TEA', 'TNA', 'TS'];
  customer = {name: '', lastname: '', dni: 0 , celular: 0, wallet: 0, cuotas: 0, topay: 0,
    stock: 0, tasa: '', rate: 0, initialdate: new Date(), endingdate: new Date(), movimientos: [], userId: 0};
  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    this.form = new FormGroup({name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]/)]), lastname: new FormControl('', [Validators.required, Validators.minLength(3), , Validators.pattern(/^[A-Za-z]/)]),
      // tslint:disable-next-line:max-line-length
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]\d{0,10}$/)]), celular: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[0-9]\d{0,10}$/)]),
    rate: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d{0,10}$/)])});
    this.userService.getUser().subscribe(users => {
      this.users = users; } );
  }
  ngOnDestroy(): void {
    window.location.reload();
  }
  createCustomer(): any{
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < (this.users).length; i++)
    {
      if (this.users[i].islogged === true)
      {
        this.customer.userId = this.users[i].id ;
      }
    }
    this.customer.name = this.form.value.name;
    this.customer.lastname = this.form.value.lastname;
    this.customer.dni = this.form.value.dni;
    this.customer.celular = this.form.value.celular;
    this.customer.tasa = this.tempTasa;
    this.customer.wallet = 0;
    this.customer.stock = 5;
    // tslint:disable-next-line:radix
    this.customer.rate = parseInt(this.form.value.rate);
    this.customer.initialdate = null;
    this.customer.endingdate = null;
    this.customer.movimientos = [];
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
