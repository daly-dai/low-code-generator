export interface ItemConfig {
  label: string;
  labelWidth: string | null
}

declare const ComponentsTagTypes: readonly ["input", "textArea", "password", "telephone", "select", "cascader", "radio"];

export type ComponentsTagType = typeof ComponentsTagTypes[number];


export interface ComponentsConfig {
  id?: string;
  config: ItemConfig,
  tag: ComponentsTagType
}