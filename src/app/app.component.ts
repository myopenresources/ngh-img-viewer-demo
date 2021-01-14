import { Component } from '@angular/core';
import { NghImgViewerComponent, NghImgViewerModel } from 'ngh-img-viewer';
import { NghImgViewerService } from 'ngh-img-viewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private nghImgViewerService: NghImgViewerService) {

  }
  imgList = ['../assets/img/0.png', '../assets/img/1.png'];

  addImg() {
    this.imgList.push('../assets/img/3.jpg');
  }

  openImgviewer() {
    const img: NghImgViewerModel = {
      src: '../assets/img/0.png',
      label: '这是一张图片'
    };

    this.nghImgViewerService.openImgViewer(NghImgViewerComponent, img, { imgMinDimensions: 250 });
  }
}
