import { getUrlSearchParams } from '@/utils/calculator';
import { useEffect, useRef } from 'react';

const useLocationParams = (params?: string | string[]) => {
  const paramsRef = useRef<Record<string, any>>({});

  useEffect(() => {
    const searchParams = getUrlSearchParams() || {};
    if (!params) {
      paramsRef.current = searchParams;
      return;
    }
    const keys = !Array.isArray(params) ? [params] : params;
    const result: Record<string, any> = {};
    for (const key of keys) {
      if (searchParams.hasOwnProperty(key)) {
        result[key] = searchParams[key];
      }
    }
    paramsRef.current = result;
  }, []);

  return paramsRef.current;
};

export default useLocationParams;
