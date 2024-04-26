const menu = document.getElementById("menu");
const shopMenu = document.getElementById("shopMenu");
const achievementsMenu = document.getElementById("achievementsMenu");
const statPrice = {
    health: 100,
    strength: 100,
    stamina: 100,
    agility: 100,
    luck: 100,
    mana: 100,
};
const statDesc = {
    health: "This stat increases your maximum hitpoints.",
    strength: "This stat increases your maximum strength (melee damage).",
    stamina:
        "This stat increases the amount of dungeons you can do before resting. Note that if you run out of stamina, you will need to rest.",
    agility: "This stat increases the chances to dodge attacks.",
    luck: "This stat increases the chance of receiving extra gold or loot at the end of dungeons.",
    mana: "This stat increases your maximum mana points (no use yet)",
    rest: "This recovers your Health stat back to its maximum value (The cost to rest is 200 + 20%).",
};
const defaultStats = {
    health: 100,
    strength: 1,
    stamina: 100,
    agility: 1,
    luck: 0,
    mana: 100,
};

window.addEventListener("loadComplete", function () {
    document
        .getElementById("dungeonsBtn")
        .addEventListener("click", function () {
            if (window.currentStats["stamina"] <= 0) {
                return;
            }
            window.location.href = "dungeon.html";
        });

    document.getElementById("shopBtn").addEventListener("click", function () {
        menu.style.display = "block";
    });

    document
        .getElementById("achievementsBtn")
        .addEventListener("click", function () {
            menu.style.display = "block";
        });

    level = document.getElementById("levelBox");
    level.textContent = `Level ${Math.floor(window.xp / 100)}`;

    updateStats();
});

function toggleShow(uiid) {
    var ui = document.getElementById(uiid);
    var overlay = document.getElementById("overlay");

    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        overlay.classList.add("show");
        ui.classList.remove("hidden");
    } else {
        menu.classList.add("hidden");
        overlay.classList.remove("show");
        shopMenu.classList.add("hidden");
        achievementsMenu.classList.add("hidden");
    }
}

function restButton() {
    window.currentStats["health"] = window.maxStats["health"];
    window.currentStats["stamina"] = window.maxStats["stamina"];
    updateStats();
}

function shopHover(event) {
    if (event.target.tagName === "BUTTON") {
        updateStats(event);
    }
}

function shopBuy(item) {
    if (item.target.tagName === "BUTTON") {
        let content = item.target.textContent.toLowerCase().trim();
        if (content === "agility" && window.maxStats["agility"] >= 70) {
            return;
        }
        price = calcCost(content);
        if (window.currency >= price) {
            window.currency -= price;
            window.maxStats[content] += 1;
            window.currentStats[content] += 1;
            updateStats(item);
        } else {
            console.log("no money");
        }
    }
}

function updateStats(item = null) {
    document.getElementById("currencyBox").textContent =
        window.currency + " Gold";

    if (item) {
        let content = item.target.textContent.toLowerCase().trim();
        const cost = document.getElementById("itemCost");
        const desc = document.getElementById("itemDesc");
        cost.textContent = calcCost(content);
        desc.textContent = statDesc[content];
    }

    const statDiv = document.getElementById("stats-menu");
    for (let i = 0; i < statDiv.children.length; i++) {
        const key = statDiv.children[i].getAttribute("data-key");
        if (key && window.currentStats.hasOwnProperty(key)) {
            statDiv.children[i].textContent = `${
                key.charAt(0).toUpperCase() + key.slice(1)
            } : ${window.currentStats[key]} / ${window.maxStats[key]}`;
        }
    }
}

function calcCost(content) {
    let cost = 0;
    if (content === "rest") {
        console.log("rest");
        if (window.currency < 200) {
            cost = 200;
            return cost;
        }
        cost = 200 + Math.floor((window.currency - 200) / 5);
        return cost;
    }
    let max = window.maxStats[content] + 1 - defaultStats[content];
    for (let i = 1; i <= max; i++) {
        cost += 100 + 10 * i;
    }
    return cost;
}
