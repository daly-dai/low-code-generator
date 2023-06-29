
import { FC } from "react"
import { DragSourceMonitor, useDrag } from "react-dnd"
import { useSnapshot } from "valtio"
import { cloneDeep } from "lodash-es"

import "./index.less"

import formStore from "@/store/form"
import { ComponentsConfig, ComponentsTagType } from "@/constants/generator/type"
import componentsTagMap from "@/constants/generator/left-config"
import { genNonDuplicateID } from "@/utils/tool"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageLeftDrag: FC<ComponentsConfig> = ({ config, tag }) => {

  const formState = useSnapshot(formStore.state);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dropCardList } = formState

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'BOX',
    item() {
      const useless = dropCardList.find((item: any) => item.id === -1);
      const currentComponents = cloneDeep(componentsTagMap[tag as ComponentsTagType])

      if (!useless) {
        formState.dropCardList.unshift({ ...currentComponents, id: -1 })
      }

      return { tag }
    },
    end(_: unknown, monitor: DragSourceMonitor) {
      const uselessIndex = dropCardList.findIndex((item: any) => item.id === -1);
      /**
       * 拖拽结束时，判断是否将拖拽元素放入了目标接收组件中
       *  1、如果是，则使用真正传入的 box 元素代替占位元素
       *  2、如果否，则将占位元素删除
       */
      if (monitor.didDrop()) {
        const currentComponents = cloneDeep(componentsTagMap[tag as ComponentsTagType]);

        currentComponents["id"] = genNonDuplicateID();

        dropCardList.splice(uselessIndex, 1, { ...currentComponents });
      }

      dropCardList.splice(uselessIndex, 1);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (<div
    ref={dragPreview}
    style={{ opacity: isDragging ? 0.5 : 1 }}
    className='drag'
  >
    <div ref={drag} className='drag-item'>
      {config?.label || ''}
    </div>
  </div>)
}


export default PageLeftDrag