import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NghImgViewerContainerDirective } from './ngh-img-viewer-container.directive';
import { NghImgViewerService } from './ngh-img-viewer.service';
import { NghImgViewerComponent } from './ngh-img-viewer/ngh-img-viewer.component';



@NgModule({
  declarations: [NghImgViewerComponent, NghImgViewerContainerDirective],
  imports: [
    CommonModule
  ],
  exports: [NghImgViewerComponent, NghImgViewerContainerDirective],
  providers: [NghImgViewerService]
})
export class NghImgViewerModule { }
