const process = require("process")

if (process.platform == "linux") {
    const gSettings = require("node-gsettings-wrapper")

    exports.getTheme = function () {
        const theme = gSettings.Key.findById("org.gnome.desktop.interface", "gtk-theme").getValue()
        return {
            isDark: theme.endsWith("dark"),
            name: theme
        }
    }

    exports.register = function (callback) {
        removeListener = gSettings.Key.findById("org.gnome.desktop.interface", "gtk-theme").addListener((_, theme) => {
            callback(({
                isDark: theme.endsWith("dark"),
                name: theme
            }))
        })
    }

    exports.unregister = function () { removeListener() }

    var removeListener

} else {
    const addon = require('registry-changes-detector')

    exports.register = function (callback) {
        eventSource = addon.register({
            key: "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize",
            value: "SystemUsesLightTheme",
            type: "number"
        }, n => callback(({
            isDark: n != 1
        })))
    }

    exports.getTheme = function () {
        return {
            isDark: addon.getDWord(eventSource, 1) != 1
        }
    }
    exports.unregister = function () { addon.unregister(eventSource) }

    var eventSource
}
