import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[bannerHide]'
})
export class BannerHideDirective implements OnInit {

  constructor(private viewContRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  @Input() bannerHide = 1000;
  @Input('bannerHideAfter') placeholder: TemplateRef<any> | null = null;

  ngOnInit(): void {
    this.viewContRef.createEmbeddedView(this.templateRef);

    setTimeout(() => {
      this.viewContRef.clear();
      if(this.placeholder){
        this.viewContRef.createEmbeddedView(this.placeholder)
      }
    }, this.bannerHide)
  }

}

// ! Attribute vs Structural Directives 

//   . Attribute Directives
//   - Look like normal HTML Attributes 
//   - May have data-binding or event binding
//   - ONLY AFFECT / CHANGE the element they are added TODO - 

//   . Structural Directives
//   - Look like normal HTML Attributes
//   - But have a * in the beginning 
//   - AFFECT / CHANGE a whole area in the DOM 
//   - Elements get added or removed

// -------------------------------------------------------------------------------------------------------------------------------------


// ! Creating your own Attribute Directives
//   : name.directive.ts
//   : import from CORE
//   - Needs a selector value
//   - But we need to wrap it in [] as it will render it as an element without it and not as an Attribute
//   - Now each time we use it we DON'T need the [] enclosing the name but angular will recognise it as an Attribute
//   : selector: '[appBasicHighlight]'

//   - We need to then export it as a class and include a constructor 

//   - On the list of args for the constructor () we can list args we want to get every time an instance of this class is created and every time we use it
//   - Angular is responsible for then creating and injecting this into our attribute
//   : export class BasicHighlightingDirective {
//   :   constructor(){
//   :     
//   :   }
//   : }

//   - Though we need a reference for the element the directive was placed on 

//   : chosenName: ElementRef

//   - to be able to use this data in our class, we can place PRIVATE ahead of these args
//   - which will make them both a property of the class
//   - And auto assign the value instance to the property

//   * it is best to place the creation of the within the ONINIT lifecycle method
//   ~ This way our item is created upon initialization of the item

//   ?   import { Directive, OnInit } from '@angular/core';
//   ? 
//   ?   @Directive({
//   ?     selector: 'appBasicHighlight'
//   ?   })
//   ? 
//   ?   export class BasicHighlightingDirective implements OnInit {
//   ?     constructor(private ourElemRef: ElementRef){ 
//   ?   }
//   ? 
//   ?   ngOnInit(){
//   ?     this.ourElemRef.nativeElement.style.backgroundColor = 'yellowgreen';
//   ?   }
//   ? }

//   * So what we're doing here is :
//   ~ we are getting access to the element the directive was placed on 
//   ~ getting access to the exact element 
//   ~ and then over writing this element
//   - We need to update the app.module.ts to inform that we have a new directive

//   : <div class="container">
//   :   <h1>Child One</h1>
//   .   <p appBasicHighlight>I am a sentence</p>
//   :   <button>Press Me</button>
//   : </div>

// # NOTE: It is NOT good practice to directly access elements, as Angular MAY RENDER YOUR TEMPLATES BEFORE ACCESSING THE DOM, therefor, your elements and everything associated with them may not be available and therefor unable to be accessed and used.

// -------------------------------------------------------------------------------------------------------------------------------------

// ! How should we access our elements? RENDERER2 

//   - Renderer is a tool which we can use to better construct our Directives and apply whatever changes we want onto our elements
//   - We do this by creating a variable of which we assign a TYPE: RENDERER2
//   : private renderName: Renderer2

//   - Now if I use my chosen name with type renderer2, we have access to DOM element methods 

//   - We have an issue at this point as we NEED the actual element of which we want to set the property change/application 
//   - We do this by injection of our variable of TYPE: ElementRef

//   . ElementRef gives us the reference to the element we have bound to and returns an OBJECT
//   . The Object then contains our NativeElement method of which gives us access to the base element itself and allows us to then extend it with methods and properties that come with the element 
//   ? elOne: ElementRef;
//   ? console.log(this.elOne);
//   ~ RETURNS
//   ? ElementRef {nativeElement: h1}
//   ?   nativeElement: h1
//   ?   __proto__: Object

//   ? console.log(this.elOne.nativeElement);
//   ~ RETURNS 
//   : <h1 _ngcontent-yvi-c12="">Child One</h1>

//   . And we then obviously have all props/methods available on an H1 element

//   ? constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  
//   ? ngOnInit() {
//   ?   this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'none')
//   ? }
  

// -------------------------------------------------------------------------------------------------------------------------------------

// ! @HostListener 

// - Now we can take this a step further and make it more interactive

//   - We need to react to some events occurring on the element that the Directive sits on 
//   - Quick and easy way to do this, WITHIN the Directive is to simply add:
//   : @HostListener decorator and add it to a method we want to execute
//   - Eg: Mouseover

// ? export class BetterHightlightDirective {
// ?   
// ?   constructor(private elRef: ElementRef, private renderer: Renderer2) {}
// ?   
// ?   @HostListener('mouseover') mouseover(eventData: Event) {
// ?     this.renderer.setStyle(this.elRef.nativeElement, 'background-color', ? 'blue')
// ? 
// ?   }
// ?   @HostListener('mouseleave') mouseleave(eventData: Event) {
// ?     this.renderer.setStyle(this.elRef.nativeElement, 'background-color', ? 'transparent')
// ?   }
// ? 
// ?   @HostListener('click') click(eventData: Event) {
// ?     this.renderer.setStyle(this.elRef.nativeElement, 'background-color', ? 'yellowgreen')
// ?   }
// ? 
// ? }


// ! @HostBinding instead of Renderer2 

//   - We can pass a string defining which property of the hosting element we want to bind to
//   - Similar to accessing STYLE on:
//   : this.elemRef.nativeElement.STYLE

//   - In this case, we would simply supply this to the HostBinding as parameters
//   : @HostBinding(style.backgroundColor)

//   * So we are essentially telling Angular:
//   ~ On the element that this directive sits 
//   ~ Please access the STYLE property 
//   ~ Of which the backgroundColor specifically
//   ~ And set it to whichever value I give here in this variable
//   : @HostBinding('style.backgroundColor') backgroundColorVar: string;


//   ? export class BetterHightlightDirective implements OnInit{
//   ? 
//   ?   @HostBinding('style.backgroundColor') backgroundColorVar: string = 'transparent'
//   ? 
//   ?   constructor(private elRef: ElementRef, private renderer: Renderer2) {}
//   ?   
//   ?   @HostListener('mouseover') mouseover(eventData: Event) {
//   ?     this.backgroundColorVar = 'red'
//   ? 
//   ?   }
//   ?   @HostListener('mouseleave') mouseleave(eventData: Event) {
//   ?     this.backgroundColorVar = 'transparent'
//   ? 
//   ?   }
//   ? 
//   ?   @HostListener('click') click(eventData: Event) {
//   ?     this.backgroundColorVar = 'yellowgreen'
//   ?   }  
//   ? }


// ! Binding to Directive properties 
// ! If we want to dynamically change the values of which our properties are bound to 


//   - We're giving some default, hard coded colors, to show how they will be over written


// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------

// ! Structural Directives 

//   # Responsible for adding / removing / manipulating certain parts of the DOM   
//   - By default, nothing is rendered as everything needs to be explicitly given
//   - The following is our components HTML 

//   . ngOnInit
//   - We use this method to render the template (which cannot be done without a ViewContainerRef)
//   - It is invoked only once when the directive is instantiated.
//   - Within here  
//   / Read more on ngOnInit and the constructor below


//   : <h1>Structural Directives</h1>

//   : <h3 *appRepeat>*: Repeat Me!</h3>

//   : <ng-template appRepeat>
//   :   <h3>Repeat Me!</h3>
//   : </ng-template>


//   . Get and Inject the TemplateRef
//   # TEMPLATEREF IS THE WHAT 
//   - This is the reference to the template element
//   - It requires a generic ANY type

//   . ViewContainerRef
//   # VIEWCONTAINERREF IS THE WHERE 
//   - To render the template, we need a ViewContainerRef
//   - A reference to the place where the Directive is located in the view
//   - This gives us access to the createEmbeddedView Method
//   * createEmbeddedView method allows us to render our TemplateRef value

//   ? @Directive({
//   ?   selector: '[appRepeat]'
//   ? })

//   ? export class RepeatDirective implements OnInit{
//   ?   constructor(private templateRef: TemplateRef<any>, private viewRef: ViewContainerRef) { }
//   ?   ng OnInit(){
//   ?     this.viewRef.createEmbeddedView(this.templateRef)
//   ?   }
//   ? }

//   . Micro syntax
//   - In order to make the Directive more configurable, we do this by adding:
//   * Input Binding
//   ~ [directive]="configVariable"
//   - Allowing us to make the directive more dynamic with variables and

//   : <h3 *appRepeat="variable" >*: Repeat Me!</h3>

//   ? @Input('directiveName') variable: type; 
  
//   : <input type="number" [(ngModel)]="variable"

//   . ngOnChanges
//   - In order to dynamically change this according to input, we would need to listen to changes on the element
//   - In this case we would you the lifecycle method OnChanges RATHER than OnInit
//   * But we need to ensure that we CLEAR our existing view on every change
//   ~ This way our previous views will not still be present
//   * BE SURE YOU HAVE FORM MODULES imported from Angular/Forms

//   - Be sure to add these values to your component.ts file on which you bind to
//   ? times: number = 5; || times: number;
 
//   : <label >Times:</label>
//   : <input type="number" [(ngModel)]="times"> 

//   : <h3 *appRepeat="times">*: Repeat Me!</h3>

//   : <ng-template appRepeat [appRepeat]='times'>
//   :   <h3>Repeat Me!</h3>
//   : </ng-template>


//   - -------------------------------------
//   / <h3 *appRepeat="3">*: Repeat Me!</h3> - Hard coded as apposed to above
//   - -------------------------------------
//   / <ng-template appRepeat [appRepeat]='3'>
//   /   <h3>Repeat Me!</h3>
//   / </ng-template>



// ! Template Context && Adding an Interface 

//   - In most cases, we want to render the ng-template in a certain context 
//   > EG: Let us see the current index of the items that we replicate
//   - We can do this by passing an additional Context Object when creating each view
//   - Each Template can be associated with a SPECIFIC CONTEXT
//   > So below we pass a context {} where the INDEX variable is bound to I from the logic
//   - We can also apply other variables here and pass the to our component through our CONTEXT OBJECT

//   ? myStrVal: string = ':End:';

//   ? ngOnChanges() :void {
//   ?   this.viewRef.clear()
//   ?   for(let i = 0; i < this.times; i++){
//   ?     this.viewRef.createEmbeddedView(this.templateRef, {
//   ?       index: i,
//   ?       toCompAs: this.myStrVal
//   ?     })
//   ?   }
//   ? }

//   - Now we have to get the INDEX from the context in our properties
//   - Which we get in micro syntax using the LET keyword
//   - We can see below the difference between use of:
//   * strucDirective
//   ~ ng-template 

//   : <label >Times:</label>
//   : <input type="number" [(ngModel)]="times"> 

//   * <h3 *appRepeat="times; let i = index; let showStr = toCompAs" >
//   *   *: Repeat Me! - {{i}} - {{showStr}}
//   : </h3>

//   ~ <ng-template appRepeat [appRepeat]='times' let-i="index">
//   ~   <h3>Repeat Me! - {{i}}</h3>
//   : </ng-template>


//   - We can add our Context Object values here and specify the TYPES we expect 
//   - This will keep our code TYPE safe

//   ? interface RepeatTemplateContext {
//   ?   index: number;
//   ?   toCompAs: string;
//   ? }

//   ? @Directive({
//   ?   selector: '[appRepeat]'
//   ? })
  
//   ? export class RepeatDirective {

//   ?   @Input('appRepeat') times: number;

//   ?   myStrVal: string = ':End:';

//   ?   constructor(private templateRef: TemplateRef<any>, private viewRef: ViewContainerRef) { }

//   ?   ngOnChanges() :void {
//   ?     this.viewRef.clear()
//   ?     for(let i = 0; i < this.times; i++){
//   ?       this.viewRef.createEmbeddedView(this.templateRef, {
//   ?          index: i,
//   ?          toCompAs: this.myStrVal
//   ?       })
//   ?     }
//   ?   }
//   ?  }

  
//   : <h3 *appRepeat="times; let i = index; let showStr = toCompAs" >
//   :   *: Repeat Me! - {{i}} - {{showStr}}
//   : </h3>

//   : <ng-template appRepeat [appRepeat]='times' let-i="index" let-showStr="toCompAs">
//   :   <h3>Repeat Me! - {{i}} - {{showStr}}</h3>
//   : </ng-template>

// ! IMPLICIT 

//   - We can make things more IMPLICIT in regards to use of our variables and reduce code
//   - This allows us to remove the association conversion on the template side

//   ? interface RepeatTemplateContext {
//   ?   index: number;
//   ?   toCompAs: string;
//   ? }

//   ? export class RepeatDirective {
//   ?   myStrVal: string = ':End:';

//   ?   ngOnChanges() :void {
//   ?     this.viewRef.clear()
//   ?     for(let i = 0; i < this.times; i++){
//   ?       this.viewRef.createEmbeddedView(this.templateRef, {
//   ?          index: i,
//   ?          toCompAs: this.myStrVal
//   ?       })
//   ?     }
//   ?   }
//   ?  }

//   : < HTML SAME AS ABOVE />

//   - AS COMPARED TO IMPLICIT APPLICATION 

//   ? interface RepeatTemplateContext {
//   ?   index: number;
//   ?   toCompAs: string;
//   ? }

//   ? export class RepeatDirective {
//   ?   myStrVal: string = ':End:';

//   ?   ngOnChanges() :void {
//   ?     this.viewRef.clear()
//   ?     for(let i = 0; i < this.times; i++){
//   ?       this.viewRef.createEmbeddedView(this.templateRef, {
//   ?          index: i,
//   ?          toCompAs: this.myStrVal
//   ?       })
//   ?     }
//   ?   }
//   ?  }

//   * <h3 *appRepeat="times; let i; let showStr = toCompAs" >
//   :   *: Repeat Me! - {{i}} - {{showStr}}
//   : </h3>

//   * <ng-template appRepeat [appRepeat]='times' let-i let-showStr="toCompAs">
//   :   <h3>Repeat Me! - {{i}} - {{showStr}}</h3>
//   : </ng-template>


// -------------------------------------------------------------------------------------------------------------------------------------


// ! Constructor & ngOnInit relationship 

//   - The Constructor is a default method of the class that is executed when the class is instantiated and ensures proper initialization of fields in the class and its subclasses. Angular, or better Dependency Injector (DI), analyses the constructor parameters and when it creates a new instance by calling new MyClass() it tries to find providers that match the types of the constructor parameters, resolves them and passes them to the constructor like

//   ? new MyClass(someArg);

//   - ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the component.

//   - We have to import OnInit like this in order to use it (actually implementing OnInit is not mandatory but considered good practice):

//   ? import { Component, OnInit } from '@angular/core';

//   - then to make use of the method OnInit, we have to implement the class like this:

//   ? export class App implements OnInit {
//   ?   constructor() {
//   /     Called first time before the ngOnInit()
//   ?   }

//   ?   ngOnInit() {
//   /     Called after the constructor and called  after the first ngOnChanges() 
//   ?   }
//   ? }


//   - Implement this interface to execute custom initialization logic after your directive's data-bound properties have been initialized. ngOnInit is called right after the directive's data-bound properties have been checked for the first time, and before any of its children have been checked. It is invoked only once when the directive is instantiated.

//   : Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor. The constructor should only be used to initialize class members but shouldn't do actual "work".

//   : So you should use constructor() to setup Dependency Injection and not much else. ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.



