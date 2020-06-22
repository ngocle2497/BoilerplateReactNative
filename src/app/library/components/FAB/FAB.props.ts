import {FABDefaultProps} from './components/FABDefault/FABDefault.props';
import {FABGroupProps} from './components/FABGroup/FABGroup.props';
export interface FABProps extends FABGroupProps, FABDefaultProps {
  type?: 'default' | 'group';
}
