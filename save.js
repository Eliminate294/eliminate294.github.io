if (typeof Storage !== "undefined") {
    window.addEventListener("beforeunload", function () {
        localStorage.setItem("currency", window.currency);
        localStorage.setItem("xp", window.xp);
        localStorage.setItem(
            "currentStats",
            JSON.stringify(window.currentStats)
        );
        localStorage.setItem("maxStats", JSON.stringify(window.maxStats));
    });

    window.addEventListener("load", function () {
        let currency = localStorage.getItem("currency");
        let xp = localStorage.getItem("xp");
        let currentStats = JSON.parse(localStorage.getItem("currentStats"));
        let maxStats = JSON.parse(localStorage.getItem("maxStats"));

        if (currency !== null) {
            window.currency = currency;
        }
        if (xp !== null) {
            window.xp = xp;
        }
        if (currentStats !== null) {
            window.currentStats = currentStats;
        }
        if (maxStats !== null) {
            window.maxStats = maxStats;
        }

        console.log("currency:", window.currency);
        console.log("xp:", window.xp);
        console.log("current stats:", window.currentStats);
        console.log("max stats:", window.maxStats);

        const loadEvent = new Event("loadComplete");
        window.dispatchEvent(loadEvent);
    });

    document
        .getElementById("dltDataBtn")
        .addEventListener("click", function () {
            localStorage.clear();
            console.log("cleared data");
            for (let prop in window) {
                if (window.hasOwnProperty(prop)) {
                    delete window[prop];
                }
            }
            window.location.href = "index.html";
        });
} else {
    console.log("browser does not support web storage");
}
