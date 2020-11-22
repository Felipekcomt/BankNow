import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-error-pay',
  templateUrl: './dialog-error-pay.component.html',
  styleUrls: ['./dialog-error-pay.component.css']
})
export class DialogErrorPayComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }
  GotoBack(): any{
    this.router.navigate(['/customer']);
  }
}
