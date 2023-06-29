import React, { FC } from 'react';
import loadingSvg from './loading.gif';
import { Spin } from 'antd';
import { SpinProps, SpinSize } from 'antd/es/spin';

type LoadingProps = {
  size: SpinSize;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
} & SpinProps;

const CommonLoading: FC<LoadingProps> = ({
  size = 'small',
  imgProps,
  ...props
}) => {
  return (
    <Spin
      indicator={<img src={loadingSvg} {...imgProps} />}
      size={size}
      {...props}
    />
  );
};

export default CommonLoading;
