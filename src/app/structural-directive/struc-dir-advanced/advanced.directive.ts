import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
class HideAfterContext {
  public advancedDir = 0;
}

@Directive({
  selector: '[advancedDir]'
})


export class AdvancedDirective implements OnInit {

  constructor(private viewContRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  @Input() 
  set advancedDir(value: number | null){
    this._advancedDir = value ?? 0;
    this.context.advancedDir = this._advancedDir / 1000;
  }
  private _advancedDir = 0;


  @Input('advancedDirPost') placeholder: TemplateRef<any> | null = null;
  
  private context = new HideAfterContext();

  ngOnInit(): void {
    this.viewContRef.createEmbeddedView(this.templateRef, this.context);

    setTimeout(() => {
      this.viewContRef.clear();
      if(this.placeholder){
        this.viewContRef.createEmbeddedView(this.placeholder)
      }
    }, this._advancedDir)
  }

}

// ?? Nullish Coalesscing
