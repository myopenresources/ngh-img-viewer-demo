import {
  Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, OnChanges,
  SimpleChanges, AfterViewInit, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, Directive, Output, EventEmitter
} from '@angular/core';
import { NghImgViewerModel } from './ngh-img-viewer/ngh-img-viewer-model';
import { NghImgViewerComponent } from './ngh-img-viewer/ngh-img-viewer.component';

@Directive({
  selector: '[nghNghImgViewerContainer]'
})
export class NghImgViewerContainerDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input()
  imgClass: string = '';

  @Input()
  imgStyle: { [key: string]: string } = {};

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

  imgList: NghImgViewerModel[] = [];

  imgMutationObserver = undefined;


  imgViewerRef: ComponentRef<NghImgViewerComponent> = undefined;

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    if (this.imgMutationObserver) {
      this.imgMutationObserver.disconnect();
    }

    if (this.imgViewerRef) {
      this.imgViewerRef.destroy();
    }
  }

  constructor(private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private elementRef: ElementRef
  ) {

  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.initImgViewer();
    this.initImgMutationObserver();
  }

  initImgMutationObserver() {
    this.initImgList();
    this.imgMutationObserver = new MutationObserver(() => {
      this.initImgList();
    });
    this.imgMutationObserver.observe(this.elementRef.nativeElement, { attributes: true, childList: true, subtree: true });
  }

  initImgList() {
    this.imgList = [];
    const imgElements: HTMLImageElement[] = this.elementRef.nativeElement.getElementsByTagName('img');
    if (imgElements && imgElements.length) {
      for (let i = 0; i < imgElements.length; i++) {
        const imgElement = imgElements[i];
        this.imgList.push({
          src: imgElement.src,
          label: imgElement.alt
        });

        const clickEvent = () => {
          this.openImgViewer(i);
        };

        imgElement.removeEventListener('click', clickEvent, false);
        imgElement.addEventListener('click', clickEvent, false);

      }

      this.imgViewerRef.instance.imgList = this.imgList;
    }
  }

  initImgViewer() {
    const componentFactory = this.resolver.resolveComponentFactory(NghImgViewerComponent);
    this.imgViewerRef = componentFactory.create(this.injector);
    this.imgViewerRef.instance.imgList = this.imgList;
    this.imgViewerRef.instance.imgZoom = this.imgZoom;
    this.imgViewerRef.instance.imgMinDimensions = this.imgMinDimensions;
    this.imgViewerRef.instance.imgMaxDimensions = this.imgMaxDimensions;
    this.imgViewerRef.instance.imgPreviewLabel = this.imgPreviewLabel;
    this.imgViewerRef.instance.imgzIndex = this.imgzIndex;
    this.imgViewerRef.instance.imgIntervalTime = this.imgIntervalTime;
    this.imgViewerRef.instance.imgTooltipTime = this.imgTooltipTime;
    this.imgViewerRef.instance.useTooltip = this.useTooltip;
    this.imgViewerRef.instance.useZoomIn = this.useZoomIn;
    this.imgViewerRef.instance.useZoomOut = this.useZoomOut;
    this.imgViewerRef.instance.useOneToOne = this.useOneToOne;
    this.imgViewerRef.instance.useReset = this.useReset;
    this.imgViewerRef.instance.usePrev = this.usePrev;
    this.imgViewerRef.instance.usePlay = this.usePlay;
    this.imgViewerRef.instance.useNext = this.useNext;
    this.imgViewerRef.instance.useRotateLeft = this.useRotateLeft;
    this.imgViewerRef.instance.useRotateRight = this.useRotateRight;
    this.imgViewerRef.instance.useFlipHorizontal = this.useFlipHorizontal;
    this.imgViewerRef.instance.useFlipVertical = this.useFlipVertical;
    this.imgViewerRef.instance.viewFooterVisible = this.viewFooterVisible;
    this.imgViewerRef.instance.viewerToolbarVisible = this.viewerToolbarVisible;
    this.imgViewerRef.instance.viewerNavbarVisible = this.viewerNavbarVisible;
    this.imgViewerRef.instance.viewerTitleVisible = this.viewerTitleVisible;

    this.imgViewerRef.instance.closeImgViewer.subscribe((index: number) => {
      this.closeImgViewer.emit(index);
    });

    this.imgViewerRef.changeDetectorRef.detectChanges();
    this.appRef.attachView(this.imgViewerRef.hostView);

    document.body.appendChild(this.imgViewerRef.location.nativeElement);
  }


  openImgViewer(index: any) {
    this.imgViewerRef.instance.open(index);
  }

}

