import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StructuralDirectiveComponent } from './structural-directive/structural-directive.component';
import { BannerHideDirective } from './structural-directive/banner-hide.directive';
import { StrucDirAdvancedComponent } from './structural-directive/struc-dir-advanced/struc-dir-advanced.component';
import { AdvancedDirective } from './structural-directive/struc-dir-advanced/advanced.directive';

@NgModule({
  declarations: [
    AppComponent,
    StructuralDirectiveComponent,
    BannerHideDirective,
    StrucDirAdvancedComponent,
    AdvancedDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
