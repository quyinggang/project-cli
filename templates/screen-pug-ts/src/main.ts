import './style/index.styl'
import './config/axios'
import { getScale, debounce } from '@/utils/calculator'

// 对于echarts图表较多的rem方式需要对每一个图表进行字体大小设置以及当页面resize后图表也需要resize
// scale方式更通用，不需要对图表进行额外设置，对于非16:9大屏的处理需要根据业务调整
const initRootFontSize = () => {
  const { minScale } = getScale()
  const fontSize = minScale * 100
  document.documentElement.style.fontSize = `${fontSize}px`
  // const { scaleX, scaleY } = getScale()
  // document.documentElement.style.transform = `scale(${scaleX},${scaleY})`
}

const registerEvents = () => {
  window.addEventListener('resize', debounce(initRootFontSize, 80))
}
const initPageSkeleton = () => {
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = ''
  }
}

const initApp = () => {
  initRootFontSize()
  initPageSkeleton()
  registerEvents()
}

initApp()
