import {FABDefaultProps} from './components/default/type';
import {FABGroupProps} from './components/group/type';
export interface FABProps extends FABGroupProps, FABDefaultProps {
  type?: 'default' | 'group';
}
