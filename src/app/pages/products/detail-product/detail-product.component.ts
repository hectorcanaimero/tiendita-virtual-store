import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {

  @Input() item: any = [];

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() { }

  onClose = () => this.modal.dismiss();
}
