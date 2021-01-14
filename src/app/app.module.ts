import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NghImgViewerModule } from 'ngh-img-viewer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NghImgViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
