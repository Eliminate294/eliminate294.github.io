window.addEventListener("loadComplete", function () {
    let gold = 0;

    let randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber <= 4) {
        const enemy = new Enemy(
            "Goblin",
            100 * (Math.floor(window.xp / 100) + 1),
            0.8,
            10
        );
        combat(enemy);
        if (enemy.health <= 0) {
            let xp =
                parseInt(window.xp) +
                Math.floor(Math.random() * 21 + 30) *
                    (Math.floor(window.xp / 200) + 1);
            window.xp = xp;
            gold =
                200 +
                Math.floor(Math.random() * 400 * (currentStats["luck"] / 10));
        } else if (window.currentStats["health"] <= 0) {
            wipeData();
        }
    } else if (randomNumber <= 8) {
        gold =
            200 + Math.floor(Math.random() * 400 * (currentStats["luck"] / 10));
    } else {
        gold = 10000;
    }
    window.currentStats["stamina"] -= 5;
    window.currency = parseInt(currency) + gold;
    window.location.href = "town.html";
});

class Enemy {
    constructor(name, health, strength, mana) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.mana = mana;
    }

    attack() {
        let attackChance = Math.floor(Math.random() * 100);
        if (window.currentStats["agility"] > attackChance) {
            console.log(
                `dodged ${window.currentStats["agility"]} - ${attackChance}`
            );
            return;
        }
        window.currentStats["health"] -= Math.floor(
            Math.random() * (this.strength * 1.5 - this.strength * 0.5) +
                this.strength * 0.5
        );
    }

    defend(damage) {
        console.log("attacked by player");
        this.health -= Math.ceil(
            Math.random() * (damage * 1.5 - damage * 0.5) + damage * 0.5
        );
        if (this.health <= 0) {
            console.log("defeated by player");
        } else {
            console.log(`${this.name} has ${this.health} remaining`);
        }
    }
}

function combat(enemy) {
    while (window.currentStats["health"] > 0 && enemy.health > 0) {
        enemy.defend(window.currentStats["strength"]);
        enemy.attack();
    }
}

function wipeData() {
    localStorage.clear();
    console.log("cleared data");
    for (let prop in window) {
        if (window.hasOwnProperty(prop)) {
            delete window[prop];
        }
    }
    window.location.href = "index.html";
}
