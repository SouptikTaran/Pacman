chrome.tabs.onActivated.addListener(async function (tabId, changeInfo, tab) {
    try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    } catch (error) {
        console.error("Error:", error);
    }
});
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    } catch (error) {
        console.error("Error:", error);
    }
});
chrome.runtime.onMessage.addListener((req, sender, sendRes)=>{
    console.log(req);
    console.log(sender);
    console.log(sendRes);
    if(req.checkwebsite == 0){
        chrome.tabs.query({active:true, windowType:"normal", currentWindow: true},function(d){
            var tabId = d[0].id;
            chrome.action.setBadgeText( { text: "jhkn" } );
            chrome.action.setIcon({path: '/Images/Icons/icongrey.png', tabId: tabId});1
        })
    }
    sendRes({checkwebsite: 1})
})





