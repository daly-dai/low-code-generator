import {
  Input,
  InputNumber,
  Select,
  Slider,
  Radio,
  Switch,
  TreeSelect,
  Upload,
  DatePicker,
  TimePicker,
  Checkbox,
  Cascader,
} from 'antd';
import type { ColProps, FormItemProps, FormProps, RowProps } from 'antd';
import { TitleProps } from 'antd/es/typography/Title';
import type {
  ComponentProps,
  ElementType,
  HTMLAttributes,
  Key,
  ReactNode,
} from 'react';

export type FormGroupFieldComponentType = {
  input: typeof Input;
  inputnumber: typeof InputNumber;
  select: typeof Select;
  textarea: typeof Input.TextArea;
  slider: typeof Slider;
  radio: typeof Radio;
  switch: typeof Switch;
  treeselect: typeof TreeSelect;
  upload: typeof Upload;
  uploaddragger: typeof Upload.Dragger;
  datepicker: typeof DatePicker;
  datepickerrange: typeof DatePicker.RangePicker;
  timepicker: typeof TimePicker;
  timepickerrange: typeof TimePicker.RangePicker;
  checkbox: typeof Checkbox;
  checkboxgroup: typeof Checkbox.Group;
  cascader: typeof Cascader;
  radiogroup: typeof Radio.Group;
};

export interface FieldListItemType<F> {
  key?: Key;
  name?: FormItemProps<F>['name'];
  label?: string | ReactNode;
  valuePropName?: string;
  fieldType?: keyof FormGroupFieldComponentType | false;
  fieldComponent?:
  | FormGroupFieldComponentType[keyof FormGroupFieldComponentType]
  | ElementType;
  formItemProps?: FormItemProps;
  fieldProps?: HTMLAttributes<object> &
  ComponentProps<
    FormGroupFieldComponentType[keyof FormGroupFieldComponentType]
  >;
  fieldChildren?: ReactNode;
  globalColProps?: ColProps;
  colProps?: ColProps;
  isCustom?: boolean;
  extraContent?: ReactNode;
}

export interface GroupListItemType<F> {
  title?: string | ReactNode;
  titleProps?: TitleProps;
  rowProps?: RowProps;
  fieldList?: FieldListItemType<F>[];
  key?: Key;
}

export interface FormGroupRowProps<F> {
  row: GroupListItemType<F>;
  disabled?: boolean;
  globalRowProps?: RowProps;
  globalColProps?: ColProps;
}

export interface FormGroupProps<F> extends FormProps<F> {
  disabled?: boolean;
  groupList: GroupListItemType<F>[];
  rowProps?: RowProps;
  colProps?: ColProps;
}
