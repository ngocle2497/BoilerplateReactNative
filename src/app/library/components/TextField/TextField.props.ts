import { InputFlatProps } from './components/Flat/InputFlat.props'
import { InputOutlineProps } from './components/OutLine/InputOutline.props'
export interface TextFieldProps extends InputFlatProps, InputOutlineProps {

  typeInput: "flat" | 'outline';

}
