import { Component, Input, TemplateRef } from '@angular/core';
import { TitleCasePipe, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ TitleCasePipe, NgTemplateOutlet ],
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() name: string = "modal";
  @Input() title?: string = "";
  @Input() button?: string = ""; // display the modal button if this value is set
  @Input() body?: TemplateRef<any> | undefined; // this is the body, which is injected when using the selector

  id: string = "";
  modalLabel: string = "";
  closeButton: string = "";

  ngOnInit() {
    this.id = this.name + "Modal";
    this.modalLabel = this.name + "ModalLabel";
    this.closeButton = this.name + "ModalClose";
  }
}
