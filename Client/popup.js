
//Information of current open tab
async function getCurrentTab() {
    return (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
}
//Message to background.js
async function sendmessback(tabid, message){
    await chrome.tabs.sendMessage(tabid.id, {tooglestatus: message});
}
const checkbox = document.getElementById('switch');

checkbox.addEventListener('change', async function(event) {
    if (event.target.checked) {
        console.log('Checkbox is checked');
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        // console.log(tabs[0].id);
        sendmessback(tabs[0].id, "1");
        
    } else {
        console.log('Checkbox is not checked');
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        sendmessback(tabs[0].id, "0");
    }
});
