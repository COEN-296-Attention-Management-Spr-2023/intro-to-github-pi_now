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

        chrome.storage.local.get("rpi4").then((result) => {
            console.log("old value")
            console.log(result.rpi4);
            console.log("new value")
            console.log(data)
            if(result.rpi4 === data) {
                console.log("prices were updated!!")
                chrome.storage.local.set({"rpi4": data}).then(() => {
                    console.log("Value is set from background script");
                });
                chrome.notifications.create('CacheUpdate', {
                    type: 'basic',
                    iconUrl: 'pog-u-shocked.png',
                    title: 'Prices Updatded',
                    message: 'Prices updated!!',
                    priority: 2
                });
            }
        })

       

    })
    .catch(error => {
        console.error('Error:', error);
    });
});
