# ngh-img-viewer 
## 说明
ngh-img-viewer是一个图片查看器，主要有两种使用方式：<br>
### 1.nghNghImgViewerContainer指令
将nghNghImgViewerContainer指令添加到任何HTML元素中，HTML元素中的所有图片将自动绑定查看器，点击图片就可以弹出图片查看器<br>
### 2.NghImgViewerService服务
通过NghImgViewerService服务配置相应参数，即可打开一个图片，适用于通过某个操作打开一个图片查看场景。
### 3.NghImgViewerComponent组件方式
通过NghImgViewerComponent自行扩展处理图片查看器的使用，这里自行研究
<br>

## 使用
### 安装
通过npm install ngh-img-viewer --save 安装

### 引入模块
```
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
```

### 指令方式的使用
```
<div>
  <div nghNghImgViewerContainer [imgMinDimensions]="250">
    <div>
      <div>
        <div>
          <img src="../assets//img/2.png">
        </div>
      </div>
    </div>
    <div *ngFor="let item of imgList">
      <img [src]="item">
    </div>
  </div>
  <button (click)="addImg()">添加一张</button>
</div>

import { Component } from '@angular/core';
import { NghImgViewerComponent, NghImgViewerModel } from 'ngh-img-viewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor() {
  }

  imgList = ['../assets/img/0.png', '../assets/img/1.png'];

  addImg() {
    this.imgList.push('../assets/img/3.jpg');
  }
}
```
### 服务方式的使用
```
<div>
  <button (click)="openImgviewer()">通过服务打开一张图片</button>
</div>

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

  openImgviewer() {
    const img: NghImgViewerModel = {
      src: '../assets/img/0.png',
      label: '这是一张图片'
    };

    this.nghImgViewerService.openImgViewer(NghImgViewerComponent, img, {imgMinDimensions:250});
  }
}
```

### 参数与事件
##### closeImgViewer事件
关闭按钮，按下时触发，只有组件和指令方式支持
##### imgList参数
图片列表，类型为NghImgViewerModel[]，默认为空数组，只有组件方式支持

##### imgZoom
图片缩放比例，类型为 number，默认为1.05

##### imgMinDimensions
图片最小尺寸，类型为number，默认为100

##### imgMaxDimensions
图片最大尺寸，类型为number，默认为2048

##### imgPreviewLabel
指令方式img元素没有设计alt属性，服务方式img参数、组件方式imgList参数中的label属性没有设置值时，图片默认显示标签名，类型为string，默认为'图片'

##### imgzIndex
图片查看器的css属性z-index的值，类型为number，默认为2021

##### imgIntervalTime
图片播放模式计时器时间，类型为number，默认为2000毫秒

##### imgTooltipTime
图片提示显示时间，类型为number，默认为2500毫秒

##### useTooltip
是否使用图片提示，类型为boolean，默认为true;

##### useZoomIn
是否使用放大工具条按钮，类型为boolean，默认为true;

##### useZoomOut
是否使用缩小工具条按钮，类型为boolean，默认为true;

##### useOneToOne
是否使用原图显示工具条按钮，类型为boolean，默认为true;

##### useReset
是否使用重置工具条按钮，类型为boolean，默认为true;

##### usePrev
是否使用上一张图片工具条按钮，类型为boolean，默认为true;

##### usePlay
是否使用播放工具条按钮，类型为boolean，默认为true;

##### useNext
是否使用下一张图片工具条按钮，类型为boolean，默认为true;

##### useRotateLeft
是否使用向左旋转工具条按钮，类型为boolean，默认为true;

##### useRotateRight
是否使用向右旋转工具条按钮，类型为boolean，默认为true;

##### useFlipHorizontal
是否使用水平翻转工具条按钮，类型为boolean，默认为true;

##### useFlipVertical
是否使用垂直翻转工具条按钮，类型为boolean，默认为true;

##### viewFooterVisible
是否显示底部，类型为boolean，默认为true;

##### viewerToolbarVisible
是否显示工具条，类型为boolean，默认为true;

##### viewerNavbarVisible
是否导航，类型为boolean，默认为true;

##### viewerTitleVisible
是否显示标题，类型为boolean，默认为true;

