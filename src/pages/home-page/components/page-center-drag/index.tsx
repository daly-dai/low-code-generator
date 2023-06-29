import { FC, useCallback, useRef } from "react"
import { Col, Form } from "antd"
import { DragSourceMonitor, DropTargetMonitor, XYCoord, useDrag, useDrop } from "react-dnd"
import { useSnapshot } from "valtio"

import "./index.less"

import { ComponentsConfig } from "@/constants/lowCode-configuration/type"
import formStore from "@/store/form"

interface PageCenterDragProps {
  instance: ComponentsConfig;
  index: number
}

const PageCenterDrag: FC<PageCenterDragProps> = ({ instance, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const formState = useSnapshot(formStore.state);
  const { dropCardList } = formState;

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      /**
       * 1、如果此时拖拽的组件是 Box 组件，则 dragIndex 为 undefined，则此时修改，则此时修改 cardList 中的占位元素的位置即可
       * 2、如果此时拖拽的组件是 Card 组件，则 dragIndex 不为 undefined，此时替换 dragIndex 和 hoverIndex 位置的元素即可
       */
      if (dragIndex === undefined) {
        const lessIndex = dropCardList.findIndex((item: any) => item.id === -1);

        dropCardList.splice(lessIndex, 1);
        dropCardList.splice(hoverIndex, 0, { bg: 'aqua', tag: "", category: '放这里', id: -1 });
        return
      }

      const dragCard = dropCardList[dragIndex];

      dropCardList.splice(dragIndex, 1);
      dropCardList.splice(hoverIndex, 0, dragCard);
    },
    [formState.dropCardList],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isDragging }, drag] = useDrag({
    type: 'BOX',
    collect: (monitor: any) => ({
      isDragging: monitor.getItem() ? index === monitor.getItem().index : false, // 直接用monitor.isDragging无法监控索引更改
    }),
    // item 中包含 index 属性，则在 drop 组件 hover 和 drop 是可以根据第一个参数获取到 index 值
    item: { index, id: instance.id },
    end(item: any, monitor: DragSourceMonitor) {
      const idx = item.id;
      const uselessIndex = dropCardList.findIndex((item: any) => item.id === idx);


      // 监控是否将元素移出了列表
      if (!monitor.didDrop()) {
        formState.dropCardList.splice(uselessIndex, 1);
      }
    },
  });

  const [, drop] = useDrop({
    accept: "BOX",
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) return;

      const dragIndex = item?.index;
      const hoverIndex = index;

      // 拖拽元素下标与鼠标悬浮元素下标一致时，不进行操作
      if (dragIndex === hoverIndex) return;

      // 确定屏幕上矩形范围
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // 获取中点垂直坐标
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 确定鼠标位置
      const clientOffset = monitor.getClientOffset();

      // 获取距顶部距离
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      /**
       * 只在鼠标越过一半物品高度时执行移动。
       * 当向下拖动时，仅当光标低于50%时才移动。
       * 当向上拖动时，仅当光标在50%以上时才移动。
       * 可以防止鼠标位于元素一半高度时元素抖动的状况
       */

      // 向下拖动
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;


      // 向上拖动
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // 执行 move 回调函数
      moveCard(dragIndex, hoverIndex);

      /**
       * 如果拖拽的组件为 Box，则 dragIndex 为 undefined，此时不对 item 的 index 进行修改
       * 如果拖拽的组件为 Card，则将 hoverIndex 赋值给 item 的 index 属性
       */
      if (item.index !== undefined) {
        item.index = hoverIndex;
      }
    },
  });

  return (
    <Col span={24} ref={drag(drop(ref)) as any} className="dragContainer">
      <Form.Item>
        {instance.tag}
      </Form.Item>
    </Col>
  )
}


export default PageCenterDrag