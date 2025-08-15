export {};

declare global {
  interface Window {
    /** 高德地图全局配置 */
    _AMapSecurityConfig: {
      /** 开发环境使用 生产环境不安全 */
      securityJsCode: string;
    };
  }
}
