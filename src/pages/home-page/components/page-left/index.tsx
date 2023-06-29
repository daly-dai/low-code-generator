import "./index.less"
import { LEFT_COMPONENTS } from "./constant"
import PageLeftDrag from "../page-left-drag"

const PageLeft = () => {
  return (<div className="left">
    {LEFT_COMPONENTS.map(item => {
      return (
        <div key={item.title} className="left-center">
          <div className='left-center-title'>
            {item.title}
          </div>
          <div className="left-center-list">
            {item.list.map((ele, index) => (
              <PageLeftDrag {...ele} key={index}></PageLeftDrag>
            ))}
          </div>
        </div>
      )
    })}
  </div>
  )
}

export default PageLeft