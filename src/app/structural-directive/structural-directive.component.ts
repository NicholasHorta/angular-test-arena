import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-structural-directive',
  templateUrl: './structural-directive.component.html',
  styleUrls: ['./structural-directive.component.scss']
})
export class StructuralDirectiveComponent implements OnInit {

  constructor() { }

  mySentVal: number = 100;

  ngOnInit(): void {
    setTimeout(()=> {
      this.mySentVal = 200
    }, 2000)
  }

}
