declare module 'theme-change-detect.d.ts' {
    function isLightMode(): boolean
    function register(callback: (light: boolean)=>void): void
}
