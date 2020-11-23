import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {DialogErrorPayComponent} from '../dialog-error-pay/dialog-error-pay.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrosRegisterComponent} from '../dialog-erros-register/dialog-erros-register.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private dialog: MatDialog) { }
  form: FormGroup;
  user = {email: '', password: '', islogged: false};
  users: any;
  status = true;
  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    this.form = new FormGroup({email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]), password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]) } );
    this.userService.getUser().subscribe(users => this.users = users);
  }
  Confirmation(): any{

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.users.length; i++)
    {
      if (this.users[i].email === this.form.value.email && this.users[i].password === this.form.value.password) {
          this.status = false;
        }
    }
    if ( this.form.valid && this.status === true){
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    this.user.islogged = false;
    this.userService.createUser(this.user).subscribe(() => {});
    this.router.navigate(['/login']);
    } else {
      this.dialog.open(DialogErrosRegisterComponent);
      this.status = true;
    }
  }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}
