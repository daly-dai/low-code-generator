import { FC } from 'react';

import './index.less';
import PageCenter from './components/page-center';
import PageLeft from './components/page-left';



const HomePage: FC = () => {

  return (<div className="home">
    <div className='home-left'>
      <PageLeft></PageLeft>
    </div>
    <div className='home-center'>
      <PageCenter></PageCenter>
    </div>
    <div className='home-right'>右边</div>
  </div>);
};

export default HomePage;
