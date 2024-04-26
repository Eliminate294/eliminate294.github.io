document.getElementById("newGameBtn").addEventListener("click", function () {
    window.currency = 100;
    window.xp = 0;
    window.currentStats = {
        health: 100,
        strength: 1,
        stamina: 100,
        agility: 1,
        luck: 0,
        mana: 100, // no use yet
    };
    window.maxStats = { ...window.currentStats };
    window.location.href = "town.html";
});

document.getElementById("loadGameBtn").addEventListener("click", function () {
    if (localStorage.getItem("xp") !== "undefined") {
        console.log(localStorage.getItem("xp"));
        window.location.href = "town.html";
    }
});
