import { BlockCreateContainer } from './containers/block-create/block-create.container';
import { BlockUpdateContainer } from './containers/block-update/block-update.container';
import { BlockListContainer } from './containers/block-list/block-list.container';
import { BLOCK_CREATE_ROUTE, BLOCK_DETAILS_ROUTE } from './block.routes.constants';

export const routes = [
  { path: '', children: [
    { path: '', component: BlockListContainer },
    { path: BLOCK_DETAILS_ROUTE, component: BlockUpdateContainer },
    { path: BLOCK_CREATE_ROUTE, component: BlockCreateContainer },
  ]},
];
