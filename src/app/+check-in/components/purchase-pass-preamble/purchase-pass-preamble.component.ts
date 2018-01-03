import { PurchasePassPreambleModel } from './purchase-pass-preamble.component.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fs-purchase-pass-preamble',
  templateUrl: './purchase-pass-preamble.component.html',
  styleUrls: ['./purchase-pass-preamble.component.scss']
})
export class PurchasePassPreambleComponent {
  @Input() public model: PurchasePassPreambleModel;
}
