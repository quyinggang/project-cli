import { WEEK_DAY_ALIAS_MAP } from '@/utils/constants';

export const getScale = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  const pw = width / 1920
  const ph = height / 1080
  return { scaleX: pw, scaleY: ph, minScale: Math.min(pw, ph)}
}

export const calcCurrentSize = (value: number, minValue: number) => {
  const { minScale } = getScale()
  return Math.max(minValue, value * minScale)
}

export const getUrlSearchParams = () => {
  try {
    const searchParams = new URL(location.href).searchParams;
    const params: Record<string, any> = {};
    for (const key of searchParams.keys()) {
      const lowerCaseKey = String(key).toLowerCase();
      params[lowerCaseKey] = searchParams.get(key);
    }
    return params;
  } catch (e) {
    console.error('无效的url');
  }
};

export const checkIsUseMock = () => {
  const urlParams = getUrlSearchParams();
  return urlParams ? urlParams.hasOwnProperty('mock') : false;
};

export const debounce = (func: (...params: any[]) => void, delay: number) => {
  let timeoutId: number | null = null;
  return function (this: unknown, ...args: any) {
    const context = this;
    timeoutId && window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
};

export const jsonParse = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('json parse error');
  }
};

export const padStart = (value: number | string, length: number = 2) => {
  const stringValue = String(value).trim();
  return stringValue.padStart(length, '0');
};

export const formatTime = (value: any) => {
  const dateValue = new Date(value);
  if (Number.isNaN(dateValue.valueOf())) return value;
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth() + 1;
  const date = dateValue.getDate();
  const hours = dateValue.getHours();
  const minutes = dateValue.getMinutes();
  const weekDay = WEEK_DAY_ALIAS_MAP[dateValue.getDay()];
  return `${year}-${padStart(month)}-${padStart(date)} ${padStart(hours)}:${padStart(
    minutes,
  )} ${weekDay}`;
};

export const sliceArray = (data: any[], sliceMaxLength: number = 15) => {
  if (!Array.isArray(data) || data.length === 0) return data;
  const total = Math.ceil(data.length / sliceMaxLength);
  const sliceResult = [];
  for (let index = 0; index < total; index++) {
    const part = data.slice(index * sliceMaxLength, (index + 1) * sliceMaxLength);
    sliceResult.push(part);
  }
  return sliceResult;
};
