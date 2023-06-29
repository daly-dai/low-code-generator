import { useDrop } from "react-dnd";
import { useSnapshot } from "valtio";
import { Form } from "antd";

import "./index.less"

import formStore from "@/store/form";
import { ComponentsConfig } from "@/constants/generator/type";
import PageCenterDrag from "../page-center-drag";


const PageCenter = () => {

  const formState = useSnapshot(formStore.state);
  const { dropCardList } = formState;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "BOX",
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [],
  );


  return (<div className="center" ref={drop}>
    <Form>
      {dropCardList.map((comInstance: ComponentsConfig, index: number) => (
        <PageCenterDrag index={index} key={comInstance.id} instance={comInstance}></PageCenterDrag>
      ))}
    </Form>
  </div>)
}


export default PageCenter