import {
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
  Upload,
} from 'antd';
import { FormGroupFieldComponentType } from './antd-type';

const { Dragger } = Upload;

export const FormGroupFieldComponent: FormGroupFieldComponentType =
{
  input: Input,
  inputnumber: InputNumber,
  select: Select,
  textarea: Input.TextArea,
  slider: Slider,
  radio: Radio,
  switch: Switch,
  treeselect: TreeSelect,
  upload: Upload,
  uploaddragger: Dragger,
  datepicker: DatePicker,
  datepickerrange: DatePicker.RangePicker,
  timepicker: TimePicker,
  timepickerrange: TimePicker.RangePicker,
  checkbox: Checkbox,
  checkboxgroup: Checkbox.Group,
  cascader: Cascader,
  radiogroup: Radio.Group,
};