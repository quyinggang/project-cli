export const getScale = () => {
  const designWidth = 1920
  const designHeight = 1080
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight
  const scaleX = width / designWidth;
  const scaleY = height / designHeight;
  return (width / height < designWidth / designHeight) ? scaleX : scaleY;
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
