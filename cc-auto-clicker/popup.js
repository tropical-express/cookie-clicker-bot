const toggle = document.getElementById("toggle");
const speedInput = document.getElementById("speed");

chrome.storage.sync.get(["autoClickEnabled", "clickSpeed"], (data) => {
    toggle.checked = data.autoClickEnabled || false;
    speedInput.value = data.clickSpeed || 100;
});

toggle.addEventListener("change", () => {
    chrome.storage.sync.set({ autoClickEnabled: toggle.checked });
});

speedInput.addEventListener("change", () => {
    const speed = parseInt(speedInput.value);
    chrome.storage.sync.set({ clickSpeed: speed });
});
