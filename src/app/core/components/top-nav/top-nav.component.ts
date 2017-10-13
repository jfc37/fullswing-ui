import { TopNavModel } from './top-nav.component.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fs-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  @Input() public model: TopNavModel;

  @Output() public loggedOut = new EventEmitter<void>();

  public logOut(): void {
    this.loggedOut.emit();
  }
}
