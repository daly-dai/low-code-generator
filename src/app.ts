// 运行时配置

import React from 'react';
import { request } from '../config/request';

import Container from './components/common-container';

export function rootContainer(container: any) {
  return React.createElement(Container, null, container);
}

export { request };
