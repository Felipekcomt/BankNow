import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-error-buy',
  templateUrl: './dialog-error-buy.component.html',
  styleUrls: ['./dialog-error-buy.component.css']
})
export class DialogErrorBuyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  GotoBack(): any{
    this.router.navigate(['/customer']);
  }
}
