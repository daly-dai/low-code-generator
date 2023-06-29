import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="找不到该页面"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default NoFoundPage;
