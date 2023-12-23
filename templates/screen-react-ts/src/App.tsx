import { useRef, useEffect } from 'react';
import { debounce, getScale } from '@/utils/calculator';
import useLocationParams from '@/libs/useLocationParams';
import styles from './App.module.less'

function App() {
  const screenContainerElementRef = useRef<HTMLElement>(null)

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
    const screenContainerElement = screenContainerElementRef.current;
    if (!screenContainerElement) return
    const handleScaleResize = () => {
      const scale = getScale()
      screenContainerElement.style.transform = `scale(${scale}) translate(-50%, -50%)`
    };
    const resizeHandler = debounce(() => {
      handleScaleResize();
    }, 80);
    handleScaleResize();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return <main ref={screenContainerElementRef} className={styles.main}>Hello World</main>;
}

export default App;
