
var i = 1;
//Print the current tab URL on console.log
chrome.tabs.onActivated.addListener(async function (tabId, changeInfo, tab) {
    try {
        const tabs =await chrome.tabs.query({ active: true, currentWindow: true });
        console.log(tabs[0].url);
        i++;
        chrome.action.setBadgeText({text: String(i)})
        
    } catch (error) {
        console.error("Error:", error);
    }
});
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    try {
        const tabs =await chrome.tabs.query({ active: true, currentWindow: true });
        console.log(tabs[0].url);
        i++;
        chrome.action.setBadgeText({text: String(i)})
        
    } catch (error) {
        console.error("Error:", error);
    }
});





