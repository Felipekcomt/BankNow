import {Component, OnInit, Inject, NgZone} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }
  onClose(): void {
    this.dialogRef.close();
  }
  goTo(): any {
    this.router.navigate(['/customer']);
  }
}
