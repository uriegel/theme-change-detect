export interface Theme {
    isDark: Boolean,
    name: string | undefined
}

export function getTheme(): Theme
export function register(callback: (theme: Theme)=>void): void

