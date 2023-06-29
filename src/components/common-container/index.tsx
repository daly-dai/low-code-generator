import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';

import React, { FC } from 'react';
import 'dayjs/locale/zh-cn';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const Container: FC<any> = ({ children, routes }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ConfigProvider
        locale={locale}
      >

        {React.cloneElement(children!, {
          ...children.props,
          routes,
        })}

      </ConfigProvider>
    </DndProvider>
  );
};

export default Container;
