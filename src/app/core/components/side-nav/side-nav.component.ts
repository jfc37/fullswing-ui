import { SideNavModel } from './side-nav.component.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fs-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() public model: SideNavModel;

  public hasMenuItems(): boolean {
    return !!this.model;
  }
}
