/// <reference types="vite/client" />

declare module '*.pug' {
  const value: (params?: Object) => string
  export default value
}
