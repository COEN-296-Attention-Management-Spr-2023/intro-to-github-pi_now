chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason !== 'install') {
      return;
    }
  
    // Create an alarm so we have something to look at in the demo
    await chrome.alarms.create('check-prices-alarm', {
      delayInMinutes: 30,
      periodInMinutes: 30
    });
  });

chrome.alarms.onAlarm.addListener((alarm) => {
fetch('http://127.0.0.1:5000/data', {method:'GET',mode:'no-cors'})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text(); 
})
.then(data => {
    console.log(data);
    const jsonData = JSON.parse(data);
    chrome.storage.local.set(jsonData).then(() => {
        console.log("Value is set");
      });
})
.catch(error => {
    console.error('Error:', error);
});
});

chrome.storage.onChanged.addListener((changes, namespace) => {
for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
    `Storage key "${key}" in namespace "${namespace}" changed.`,
    `Old value was "${oldValue}", new value is "${newValue}".`
    );
}
});
