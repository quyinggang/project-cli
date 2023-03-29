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
    const searchParams = new URL(location.href).searchParams
    const params: Record<string, any> = {}
    for (const key of searchParams.keys()) {
      const lowerCaseKey = String(key).toLowerCase()
      params[lowerCaseKey] = searchParams.get(key)
    }
    return params
  } catch (e) {
    console.error('无效的url')
  }
}

export const checkIsUseMock = () => {
  const urlParams = getUrlSearchParams()
  return urlParams ? urlParams.hasOwnProperty('mock') : false
}

export const debounce = (func: (...params: any[]) => void, delay: number) => {
  let timeoutId: number | null = null
  return function (this: unknown, ...args: any) {
    const context = this
    timeoutId && window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(function () {
      func.apply(context, args)
    }, delay)
  }
}

export const jsonParse = (data: any) => {
  try {
    return JSON.parse(data)
  } catch (e) {
    console.error('json parse error')
  }
}
