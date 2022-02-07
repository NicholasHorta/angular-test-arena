import { Component, Input, OnInit } from '@angular/core';

class OpenDay {
  public myVal = 0
}

@Component({
  selector: 'app-struc-dir-advanced',
  templateUrl: './struc-dir-advanced.component.html',
  styleUrls: ['./struc-dir-advanced.component.scss']
})

export class StrucDirAdvancedComponent{

  constructor() { }

  private _myVal = 5;
  private clsInst = new OpenDay();

  @Input() set myRxVal(val: any){
    this._myVal = val;
    this.clsInst.myVal = this._myVal;
  }

  get getPrivateVar(){
    return this._myVal
  }

  initSet(){
    this.myRxVal = 500;
  }

}
