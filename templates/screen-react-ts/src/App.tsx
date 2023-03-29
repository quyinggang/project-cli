import { useEffect } from 'react';
import { debounce, getScale } from '@/utils/calculator';
import useLocationParams from '@/libs/useLocationParams';

function App() {
  // 支持从url配置interval
  const { theme, interval } = useLocationParams([
    'interval',
  ]);

  useEffect(() => {
    const defaultInterval = 3000;
    const minInterval = 1000;
    const numberInterval = Number(interval);
    const legalDelay = Number.isNaN(numberInterval)
      ? defaultInterval
      : Math.max(numberInterval, minInterval);
    const timer = setInterval(() => {
      // ajax
    }, legalDelay);
    return () => timer && window.clearInterval(timer);
  }, [interval]);

  useEffect(() => {
    const initRootFontSize = () => {
      const { minScale } = getScale()
      const fontSize = minScale * 100;
      document.documentElement.style.fontSize = `${fontSize}px`;
      // const { scaleX, scaleY } = getScale()
      // document.documentElement.style.transform = `scale(${scaleX},${scaleY})`
    };
    const resizeHandler = debounce(() => {
      initRootFontSize();
    }, 80);
    initRootFontSize();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return <main>Hello World</main>;
}

export default App;
