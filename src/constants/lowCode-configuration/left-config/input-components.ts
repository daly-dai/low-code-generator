import { ComponentsConfig } from "../type"

const inputComponents: ComponentsConfig[] = [
  {
    config: {
      label: '单行文本',
      labelWidth: null
    },
    tag: "input"
  },
  {
    config: {
      label: '多行文本',
      labelWidth: null
    },
    tag: "textArea"
  },
  {
    config: {
      label: '密码',
      labelWidth: null
    },
    tag: "password"
  },
  {
    config: {
      label: '电话号码',
      labelWidth: null
    },
    tag: "telephone"
  }
]


export default inputComponents