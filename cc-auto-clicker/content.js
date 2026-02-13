let clickInterval = null;

function startClicking(speed) {
    if (clickInterval) return;
    clickInterval = setInterval(() => {
        if (typeof Game !== "undefined") {
            Game.ClickCookie();
        }
    }, speed);
}

function stopClicking() {
    if (clickInterval) {
        clearInterval(clickInterval);
        clickInterval = null;
    }
}

chrome.storage.onChanged.addListener((changes) => {
    if (changes.autoClickEnabled) {
        if (changes.autoClickEnabled.newValue) {
            chrome.storage.sync.get(["clickSpeed"], (data) => {
                startClicking(data.clickSpeed || 100);
            });
        } else {
            stopClicking();
        }
    }
    if (changes.clickSpeed && clickInterval) {
        stopClicking();
        startClicking(changes.clickSpeed.newValue);
    }
});

chrome.storage.sync.get(["autoClickEnabled", "clickSpeed"], (data) => {
    if (data.autoClickEnabled) {
        startClicking(data.clickSpeed || 100);
    }
});
