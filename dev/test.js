const themeChangeDetect = require("../index.js")

themeChangeDetect.register(theme => {
    console.log(theme)
    })
const theme = themeChangeDetect.getTheme()
console.log(theme)


setTimeout(() => themeChangeDetect.unregister(), 30000)