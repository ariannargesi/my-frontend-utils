export class ThemeHandler {
    private static applyDark = () => {
        document.documentElement.classList.toggle('dark', true)
    }
    private static applyLight = () => {
        document.documentElement.classList.toggle('dark', false)
    }
    private static applySystemDefault = () => {
        const isOS_dark = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (isOS_dark)
            this.applyDark()
        else this.applyLight()
    }
    static changeTheme = (value: 'light' | 'dark' | 'system') => {
        if (value === 'light')
            this.applyLight()
        else if (value === 'dark')
            this.applyDark()
        else this.applySystemDefault()
        localStorage.setItem('theme-mode', value)
    }
    static initiateTheme = () => {
        const defaultTheme = localStorage.getItem('theme-mode')
        if (defaultTheme !== 'light' && defaultTheme !== 'dark' && defaultTheme !== 'system')
            return
        if (defaultTheme === 'light')
            this.changeTheme('light')
        else if (defaultTheme === 'dark')
            this.changeTheme('dark')
        else this.changeTheme('system')
    }
    static getTheme = () => {
        return localStorage.getItem('theme-mode') || 'system'
    }
}
