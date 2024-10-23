import { Component, Input, TemplateRef } from '@angular/core';
import { TitleCasePipe, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [ TitleCasePipe, NgTemplateOutlet ],
  templateUrl: './accordion.component.html'
})
export class AccordionComponent {
  @Input() name?: string = "accordion";
  @Input() title?: string = "";
  @Input() body?: TemplateRef<any>; // this is the body, which is injected when using the selector
}