import { BlockEnrolmentContainer } from './containers/block-enrolment/block-enrolment.container';
import { BLOCK_ENROLMENT_ROUTE } from './enrol.routes.constants';

export const routes = [
  { path: '', children: [
    { path: BLOCK_ENROLMENT_ROUTE, component: BlockEnrolmentContainer }
  ]},
];
