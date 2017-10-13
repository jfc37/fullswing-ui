export interface SideNavModel {
  items: SideNavItemModel[];
}

export interface SideNavItemModel {
  name: string;
  routerLink: string[];
}
