function logResponse(responseDetails) {
    console.log("Request")
    console.log(responseDetails.url);
    console.log(responseDetails.statusCode);
    console.log(responseDetails)
}

const target = "https://www.linkedin.com/jobs/"

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    console.log(changeInfo.status)
    if(changeInfo.status === 'complete' && /^http/.test(tab.url)){


        chrome.webRequest.onCompleted.addListener(logResponse, 
            { 
                urls: [target],
            }
        )
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["scripts/test.js"]
        })
        .then(()=>{
            console.log("Script funcionando")
        })
        .catch(err => console.log(err))
    }

});