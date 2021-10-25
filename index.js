const process = require("process")

if (process.platform == "linux") {
    
} else {
    const addon = require('registry-changes-detector')

    exports.register = function (callback) {
        eventSource = addon.register({
            key: "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize",
            value: "SystemUsesLightTheme",
            type: "number"
        }, n => callback(n != 0))
    }

    exports.isLightMode = function () { return addon.getDWord(eventSource, 1) == 1 }
    exports.unregister = function () { addon.unregister(eventSource) }

    var eventSource
}
