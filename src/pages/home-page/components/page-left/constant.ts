import inputComponents from "@/constants/generator/left-config/input-components";
import selectComponents from "@/constants/generator/left-config/select-components";
import { LeftComponentsType } from "../../types";

// 左侧菜单栏
const LEFT_COMPONENTS: LeftComponentsType[] = [
  {
    title: "输入形组件",
    list: inputComponents
  },
  {
    title: '选择形组件',
    list: selectComponents
  }
]


export {
  LEFT_COMPONENTS
}