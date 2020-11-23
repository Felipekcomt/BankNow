import {AfterContentInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private usersService: UserService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  title = 'BankNow';
  mobileQuery: MediaQueryList;
  users: any;
  visible = null;
  refresh = null;

  fillerNav = [
    {name: 'Inicio' , route: 'cards', icon: 'home' },
    {name: 'Clientes' , route: 'customer', icon: 'group' },
    {name: 'Agregar Clientes', route: 'addcustomer', icon: 'add_circle_outline'},
    {name: 'Condiciones', route: 'terminos', icon: 'contact_support'}
  ];

  fillerContent = Array.from({length: 50}, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  shouldRun = true;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.usersService.getUser().subscribe(users => {
      this.users = users;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.users.length; i++)
      {
        if (this.users[i].islogged === true)
        {
          this.visible = true;
        }
      }
    });
  }
  logOut(): any{
    this.visible = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.users.length; i++)
    {
      if (this.users[i].islogged === true)
      {
        this.users[i].islogged = false;
        this.refresh = false;
        this.usersService.editUserById(this.users[i].id, this.users[i]).subscribe(() => {});
        this.router.navigate(['/login']);
      }
    }
  }
  Register(): void{
    this.router.navigate(['']);
  }
  login(): void{
    this.router.navigate(['/login']);
  }
}

