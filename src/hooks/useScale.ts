import { useEffect, useCallback, useState } from 'react';

export default () => {
  const [isScaleScreen, setIsScaleScreen] = useState({
    transform: `scale(1)`,
    scale: 0,
  });
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);


  const onWidthChange = useCallback(() => {
    const { innerWidth } = window;

    setIsScaleScreen({
      transform: `scale(${innerWidth / 1920})`,
      scale: innerWidth / 1920,
    });

    setInnerWidth(innerWidth)
  }, [window.innerWidth]);

  useEffect(() => {
    onWidthChange();
    window.addEventListener('resize', onWidthChange);
    return () => {
      window.removeEventListener('resize', onWidthChange);
    };
  }, []);

  return { isScaleScreen, innerWidth };
};
