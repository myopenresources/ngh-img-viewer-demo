import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { NghImgViewerModel } from './ngh-img-viewer-model';


@Component({
  selector: 'ngh-img-viewer',
  templateUrl: './ngh-img-viewer.component.html',
  styleUrls: ['./ngh-img-viewer.component.less']
})
export class NghImgViewerComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('currentImgEle', { static: false }) currentImgEle: ElementRef;

  @Input()
  imgList: NghImgViewerModel[] = [];

  @Input()
  imgZoom: number = 1.05;

  @Input()
  imgMinDimensions: number = 100;

  @Input()
  imgMaxDimensions: number = 2048;

  @Input()
  imgPreviewLabel: string = '图片';

  @Input()
  imgzIndex: number = 2021;

  @Input()
  imgIntervalTime: number = 2000;

  @Input()
  imgTooltipTime: number = 2500;

  @Input()
  useTooltip: boolean = true;

  @Input()
  useZoomIn: boolean = true;

  @Input()
  useZoomOut: boolean = true;

  @Input()
  useOneToOne: boolean = true;

  @Input()
  useReset: boolean = true;

  @Input()
  usePrev: boolean = true;

  @Input()
  usePlay: boolean = true;

  @Input()
  useNext: boolean = true;

  @Input()
  useRotateLeft: boolean = true;

  @Input()
  useRotateRight: boolean = true;

  @Input()
  useFlipHorizontal: boolean = true;

  @Input()
  useFlipVertical: boolean = true;

  @Input()
  viewFooterVisible: boolean = true;

  @Input()
  viewerToolbarVisible: boolean = true;

  @Input()
  viewerNavbarVisible: boolean = true;

  @Input()
  viewerTitleVisible: boolean = true;

  @Output()
  closeImgViewer = new EventEmitter<number>();







  viewerWidth = 0;
  viewerHeight = 0;
  viewFooterHeight = 0;
  viewerToolbarHeight = 30;
  viewerNavbarHeight = 55;
  viewerTitleHeight = 12;

  imgNaturalHeight = 0;
  imgNaturalWidth = 0;
  imgAspectRatio = 0;
  imgRotate = 0;
  imgScaleY = 1;
  imgScaleX = 1;
  imgSrc = '';
  imgPlayer = false;
  imgInterval = undefined;
  imgViewerVisible = false;
  imgTooltip = '';
  imgTooltipVisible = false;
  viewerLoadingVisible = false;
  imgindex = 0;



  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    this.clearImgInterval();
  }

  initViewFooter() {
    let height = 0;
    if (this.viewFooterVisible) {
      if (this.viewerToolbarVisible) {
        height += this.viewerToolbarHeight;
      }

      if (this.viewerNavbarVisible) {
        height += this.viewerNavbarHeight;
      }

      if (this.viewerTitleVisible) {
        height += this.viewerTitleHeight;
      }
    }

    this.viewFooterHeight = height;
  }


  initEvent() {
    fromEvent(window, 'resize')
      .pipe(throttleTime(10))
      .subscribe((event: any) => {
        this.initViewerDimensions();
        this.initImgViewer();
      });

    fromEvent(window, 'keyup')
      .pipe(throttleTime(5))
      .subscribe((event: any) => {
        switch (event.keyCode) {
          case 27: this.stop();
            break;
        }
      });

    fromEvent(window, 'mousewheel')
      .pipe(throttleTime(5))
      .subscribe((event: any) => {
        if (!event) {
          event = window.event;
        }

        let delta = 0;
        if (event.wheelDelta) {
          delta = event.wheelDelta / 120;
        } else if (event.detail) {
          delta = -event.detail / 3;
        }

        if (delta < 0) {
          this.zoomOut();
        } else {
          this.zoomIn();
        }
      });
  }

  initImgDimensions(img: any) {
    this.imgNaturalHeight = img.height;
    this.imgNaturalWidth = img.width;
    this.imgAspectRatio = this.imgNaturalWidth / this.imgNaturalHeight;
  }

  initViewerDimensions() {
    const windowHeight = this.getViewport().height;
    this.viewerWidth = this.getViewport().width;

    if (this.imgPlayer) {
      this.viewerHeight = windowHeight;
    } else {
      this.viewerHeight = windowHeight - this.viewFooterHeight;
    }

  }


  initImgViewer() {
    let width = this.viewerWidth;
    let height = this.viewerHeight;

    if (this.viewerHeight * this.imgAspectRatio > this.viewerWidth) {
      height = this.viewerWidth / this.imgAspectRatio;
    } else {
      width = this.viewerHeight * this.imgAspectRatio;
    }

    width = Math.min(width * 0.85, this.imgNaturalWidth);
    height = Math.min(height * 0.85, this.imgNaturalHeight);



    this.currentImgEle.nativeElement.style.width = width + 'px';
    this.currentImgEle.nativeElement.style.height = height + 'px';

    this.currentImgEle.nativeElement.src = this.imgSrc;
  }

  loadImg() {
    const img = new Image();
    img.src = this.imgSrc;
    this.viewerLoadingVisible = true;
    this.initViewFooter();
    this.initViewerDimensions();
    img.onload = () => {
      this.initImgDimensions(img);
      this.initImgViewer();
      this.viewerLoadingVisible = false;
    };
    img.onerror = () => {
      this.currentImgEle.nativeElement.src = '';
      this.currentImgEle.nativeElement.style.width = '50px';
      this.currentImgEle.nativeElement.style.height = '50px';
      this.viewerLoadingVisible = false;
    };
  }

  startImgInterval() {
    this.imgInterval = window.setInterval(() => {
      this.next();
    }, this.imgIntervalTime);
  }

  clearImgInterval() {
    window.clearInterval(this.imgInterval);
  }

  open(index: number = 0) {
    this.imgindex = index;
    if (this.imgList && this.imgList.length > 0 && this.imgList.length > this.imgindex) {
      this.imgSrc = this.imgList[this.imgindex].src;
    }
    this.loadImg();
    this.initEvent();
    this.imgViewerVisible = true;
  }

  close() {
    this.stop();
    this.imgViewerVisible = false;
    this.closeImgViewer.emit(this.imgindex);
  }

  play() {
    this.imgPlayer = true;
    this.reset();
    this.showTooltip('按下ESC键可结束播放!');
    this.startImgInterval();
  }


  stop() {
    if (this.imgPlayer) {
      this.imgPlayer = false;
      this.reset();
      this.clearImgInterval();
    }
  }

  next() {
    this.imgindex++;
    if (this.imgindex >= this.imgList.length) {
      this.imgindex = 0;
    }

    this.imgSrc = this.imgList[this.imgindex].src;
    this.loadImg();
  }



  prev() {
    this.imgindex--;
    if (this.imgindex < 0) {
      this.imgindex = this.imgList.length - 1;
    }

    this.imgSrc = this.imgList[this.imgindex].src;
    this.loadImg();
  }

  navbarActive(i: number) {
    this.imgindex = i;
    if (this.imgindex < 0) {
      this.imgindex = this.imgList.length - 1;
    }

    this.imgSrc = this.imgList[this.imgindex].src;
    this.loadImg();
  }

  zoomOut() {
    const width = this.currentImgEle.nativeElement.width / this.imgZoom;
    const height = this.currentImgEle.nativeElement.height / this.imgZoom;

    if (width < this.imgMinDimensions || height < this.imgMinDimensions) {
      this.showTooltip('已缩小至最小尺寸!');
      return;
    }
    this.currentImgEle.nativeElement.style.width = width + 'px';
    this.currentImgEle.nativeElement.style.height = height + 'px';
  }

  zoomIn() {
    const width = this.currentImgEle.nativeElement.width * this.imgZoom;
    const height = this.currentImgEle.nativeElement.height * this.imgZoom;
    if (width > this.imgMaxDimensions || height > this.imgMaxDimensions) {
      this.showTooltip('已放大至最大尺寸!');
      return;
    }
    this.currentImgEle.nativeElement.style.width = width + 'px';
    this.currentImgEle.nativeElement.style.height = height + 'px';
  }

  oneToOne() {
    this.currentImgEle.nativeElement.style.width = this.imgNaturalWidth + 'px';
    this.currentImgEle.nativeElement.style.height = this.imgNaturalHeight + 'px';
  }


  reset() {
    this.imgRotate = 0;
    this.imgScaleY = 1;
    this.imgScaleX = 1;
    this.currentImgEle.nativeElement.style.transform = 'none';
    this.initViewerDimensions();
    this.initImgViewer();
  }


  rotateLeft() {
    this.imgRotate -= 90;
    this.transform();
  }

  rotateRight() {
    this.imgRotate += 90;
    this.transform();
  }

  flipHorizontal() {
    this.imgScaleX = this.imgScaleX === 1 ? -1 : 1;
    this.transform();
  }

  flipVertical() {
    this.imgScaleY = this.imgScaleY === 1 ? -1 : 1;
    this.transform();
  }


  transform() {
    let transformStr = 'scaleX(' + this.imgScaleX + ') ';
    transformStr += 'rotate(' + this.imgRotate + 'deg) ';
    transformStr += 'scaleY(' + this.imgScaleY + ') ';
    this.currentImgEle.nativeElement.style.transform = transformStr;
  }

  showTooltip(msg: string) {
    if (!this.useTooltip) {
      return;
    }
    this.imgTooltip = msg;
    this.imgTooltipVisible = true;
    const tooltipTimeout = window.setTimeout(() => {
      this.imgTooltipVisible = false;
      window.clearTimeout(tooltipTimeout);
    }, this.imgTooltipTime);
  }



  getViewport(): any {
    const win = window,
      d = document,
      e = d.documentElement,
      g = (d.getElementsByTagName('body')[0]) as Element,
      w = win.innerWidth || e.clientWidth || g.clientWidth,
      h = win.innerHeight || e.clientHeight || g.clientHeight;

    return { width: w, height: h };
  }




}
