import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrorLoginComponent} from '../dialog-error-login/dialog-error-login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private userService: UserService, private dialog: MatDialog) { }
  form: FormGroup;
  users: any;
  user = {email: '', password: '', islogged: false};
  userTemp: any;
  status = false;
  ngOnInit(): void {
    this.userService.getUser().subscribe(users => {
      this.users = users; });
    this.form = new FormGroup({email: new FormControl('', [Validators.required]), password: new FormControl('', [Validators.required]) } );
  }
  ngOnDestroy(): void {
    window.location.reload();
  }

  Validation(): void{
    // tslint:disable-next-line:prefer-for-of
    if ( this.form.valid)
    {
          for (let i = 0; i < (this.users).length; i++)
          {
            if (this.users[i].email === this.form.value.email && this.users[i].password === this.form.value.password)
            {
              this.users[i].islogged = true;
              this.status = true;
              this.userService.editUserById(this.users[i].id, this.users[i]).subscribe(() => {});
              this.router.navigate(['/cards']);
            }
          }
          if ( this.status === false) {
            this.dialog.open(DialogErrorLoginComponent);
          }
          this.status = false;
    }
  }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}
