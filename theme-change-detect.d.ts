interface Theme {
    isDark: Boolean,
    name: String?
}

declare module 'theme-change-detect.d.ts' {
    function getTheme(): Theme
    function register(callback: (theme: Theme)=>void): void
}
