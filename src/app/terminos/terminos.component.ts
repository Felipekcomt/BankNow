import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})
export class TerminosComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    window.location.reload();
  }

}
