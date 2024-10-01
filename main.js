const {app,BrowserWindow} = require("electron")

let url
if (process.argv[0] == "npm") {
    url = process.argv[2]
} else {
    url = process.argv[1]
}

if (!url) {
    console.warn("No URL specified")
    console.log(process.argv)
    process.exit(1)
}

let main_window

function create_window() {
    main_window = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    })

    main_window.loadURL(url)

    main_window.on("closed",function() {
        main_window = null
    })
}

app.whenReady().then(function() {
    create_window()

    app.on("activate",function() {
        if (BrowserWindow.getAllWindows().length === 0) {
            create_window()
        }
    })
})
