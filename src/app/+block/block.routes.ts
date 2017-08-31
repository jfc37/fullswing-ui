import { BlockListContainer } from './containers/block-list/block-list.container';

export const routes = [
  { path: '', children: [
    { path: '', component: BlockListContainer }
  ]},
];
