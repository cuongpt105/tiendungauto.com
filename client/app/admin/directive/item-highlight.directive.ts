import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer } from '@angular/core';

@Directive({
  selector: '[itemHighlight]'
})

export class ItemHighlightDirective {

  private className = 'nav-hover';
  
  ///@Input('item-name')
  //private itemName: string;

 // @Output()
  //itemClick: EventEmitter<string> = new EventEmitter<string>();

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.setClassName(this.className, true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setClassName(this.className, false);
  }

  //@HostListener('click', ['$event.target']) onClick() {
  //  this.itemClick.emit(this.itemName);
  //}

  private setClassName(className: string, isAdd: boolean) {
    this.renderer.setElementClass(this.el.nativeElement, className, isAdd);
  }
}