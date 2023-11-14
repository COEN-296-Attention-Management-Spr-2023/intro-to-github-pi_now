// chrome.runtime.onStartup.addListener(async ({ reason }) => {
//     if (reason !== 'install') {
//       return;
//     }
//     console.log("startup succesful deez");
//     // Create an alarm so we have something to look at in the demo
//     await chrome.alarms.create('check-prices-alarm', {
//       delayInMinutes: 2,
//       periodInMinutes: 2
//     });
//   });

// chrome..onStartup.addListener(() => {
//     console.log("DEEEEEEEZ NUTS")
//     chrome.alarms.create('check-prices-alarm', {
//         delayInMinutes: 2,
//         periodInMinutes: 2
//     });
// })

// chrome.action.onClicked.addListener((tab) => {
//     console.log("DEEEEEEZ NUTS");
//     alert("DEEEEEEZ NUTS");
// })

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
        chrome.storage.local.set({"rpi4": data}).then(() => {
            console.log("Value is set from background script");
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
