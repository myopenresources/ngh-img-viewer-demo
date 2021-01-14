import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type } from '@angular/core';
import { NghImgViewerModel } from './ngh-img-viewer/ngh-img-viewer-model';

@Injectable({
  providedIn: 'root'
})
export class NghImgViewerService {

  private imgClass: string = '';

  private imgStyle: { [key: string]: string } = {};

  private imgZoom: number = 1.05;

  private imgMinDimensions: number = 100;

  private imgMaxDimensions: number = 2048;

  private imgPreviewLabel: string = '图片';

  private imgzIndex: number = 2021;

  private imgIntervalTime: number = 2000;

  private imgTooltipTime: number = 2500;

  private useTooltip: boolean = true;

  private useZoomIn: boolean = true;

  private useZoomOut: boolean = true;

  private useOneToOne: boolean = true;

  private useReset: boolean = true;

  private usePrev: boolean = true;

  private usePlay: boolean = true;

  private useNext: boolean = true;

  private useRotateLeft: boolean = true;

  private useRotateRight: boolean = true;

  private useFlipHorizontal: boolean = true;

  private useFlipVertical: boolean = true;

  private viewFooterVisible: boolean = true;

  private viewerToolbarVisible: boolean = true;

  private viewerNavbarVisible: boolean = true;

  private viewerTitleVisible: boolean = true;




  private imgViewerRef: ComponentRef<any> = undefined;

  private imgList: NghImgViewerModel[] = [];

  constructor(private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef) { }


  private initImgViewer(component: any) {
    const componentFactory = this.resolver.resolveComponentFactory(component);
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
      this.destroyImgViewer();
    });

    this.imgViewerRef.changeDetectorRef.detectChanges();
    this.appRef.attachView(this.imgViewerRef.hostView);

    document.body.appendChild(this.imgViewerRef.location.nativeElement);

  }

  public openImgViewer(component: any, img: NghImgViewerModel, opts: {
    imgClass?: string,
    imgStyle?: { [key: string]: string },
    imgZoom?: number,
    imgMinDimensions?: number,
    imgMaxDimensions?: number,
    imgPreviewLabel?: string,
    imgzIndex?: number,
    imgIntervalTime?: number,
    imgTooltipTime?: number,
    useTooltip?: boolean,
    useZoomIn?: boolean,
    useZoomOut?: boolean,
    useOneToOne?: boolean,
    useReset?: boolean,
    usePrev?: boolean,
    usePlay?: boolean,
    useNext?: boolean,
    useRotateLeft?: boolean,
    useRotateRight?: boolean,
    useFlipHorizontal?: boolean,
    useFlipVertical?: boolean,
    viewFooterVisible?: boolean,
    viewerToolbarVisible?: boolean,
    viewerNavbarVisible?: boolean,
    viewerTitleVisible?: boolean
  }) {
    this.imgList = [];
    this.imgList.push(img);
    Object.keys(opts).forEach((propKey) => {
      this[propKey] = opts[propKey];
    });

    this.initImgViewer(component);
    this.imgViewerRef.instance.open(0);
  }

  public destroyImgViewer() {
    this.imgList = [];
    if (this.imgViewerRef) {
      this.imgViewerRef.destroy();
    }
  }


}
