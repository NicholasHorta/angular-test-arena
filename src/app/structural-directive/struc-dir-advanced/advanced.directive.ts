import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
class HideAfterContext {
  public get $implicit(){
    return this.advancedDir;
  }
  public advancedDir = 0;
    
  public counter = 0;
}

@Directive({
  selector: '[advancedDir]'
})

export class AdvancedDirective implements OnInit {

  constructor(private viewContRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  @Input() 
  set advancedDir(value: number | null){
    this._advancedDir = value ?? 0;
    this.context.advancedDir = this.context.counter = this._advancedDir / 1000;
  }
  @Input('advancedDirPost') placeholder: TemplateRef<any> | null = null;

  private context = new HideAfterContext();

  private _advancedDir = 0;

  ngOnInit(): void {
    this.viewContRef.createEmbeddedView(this.templateRef, this.context);

    const intervalId = setInterval(() => {
      this.context.counter--
      console.log(this.context.counter);
    }, 1000);

    setTimeout(() => {
      this.viewContRef.clear();
      if(this.placeholder){
        this.viewContRef.createEmbeddedView(this.placeholder, {
            $implicit: 'DEFAULT',
            crisis: alert('CRISYS'),
            message: "Here is the message we have attached to the context object"
        })
      }
      clearInterval(intervalId);
    }, this._advancedDir)
  }
}



