import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../services/customer.service';
import {DialogErrorComponent} from '../dialog-error/dialog-error.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-details-customers',
  templateUrl: './details-customers.component.html',
  styleUrls: ['./details-customers.component.css']
})
export class DetailsCustomersComponent implements OnInit {
  @ViewChild('printEl') printEl: ElementRef;
  customer: any;
  displayedColumns: string[] = ['total', 'fecha'];

  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.customerService.getCustomerById(id).subscribe(customer => this.customer = customer);
  }
  back(): void{
    this.router.navigate(['/customer']);
  }
  GoToCreate(id: any): void{
    if (this.customer.stock > 5)
    {
      this.dialog.open(DialogErrorComponent);
    } else {
      this.router.navigate(['credito/', id]);
    }
  }
  imprimir(): void {
    window.print();
  }

}
