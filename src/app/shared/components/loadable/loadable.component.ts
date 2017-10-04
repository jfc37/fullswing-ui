import { Component, OnInit, Input } from '@angular/core';
import { LoadableModel } from './loadable.component.model';

@Component({
  selector: 'fs-loadable',
  templateUrl: './loadable.component.html',
  styleUrls: ['./loadable.component.scss']
})
export class LoadableComponent {
  @Input() public model: LoadableModel;
}
