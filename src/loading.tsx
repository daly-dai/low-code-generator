import { loading } from '@/assets/images';

const Loading = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img style={{ width: '10%', height: '10%' }} src={loading} alt="" />
    </div>
  );
};

export default Loading;
