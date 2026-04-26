declare module 'react-native-config' {
  export interface NativeConfig {
    WORKER_PASSWORD?: string;
  }
  export const Config: NativeConfig;
  export default Config;
}