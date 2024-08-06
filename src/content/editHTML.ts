function createJobSmithButton(){
    const button = document.createElement('button');
    button.className = "job-smith-button"
    button.style.backgroundColor = "#CCA349";
    button.style.borderRadius = "12px";
    button.style.padding = "0.4em 1em";
    button.style.marginLeft = "20px";
    button.style.height = "40px";
    button.style.fontSize = "16px";
    button.style.cursor = "pointer";
    button.style.color = "white";
    return button
}

function createJobSmithFrame(){
    const styles = `
        font-size: 16px;
        color: black;
        padding: 0.4em 1em;
        margin-top: 30px;
        box-shadow: rgb(158, 158, 158) 1px 1px 10px 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 800px;
        width: 100%;
        background-color: #FFF8F2;
        border-radius: 20px;
        border: 1px solid #f1f1f1;
    `

    const frame = document.createElement('div');
    frame.className = "job-smith-frame"
    frame.style.cssText = styles;
    return frame
}

async function insertRecomendation(){
    console.log("entro")
    // Button
    const buttons = document
    .getElementsByClassName("job-details-jobs-unified-top-card__container--two-pane")[0]
    .getElementsByClassName("mt5")[0]
    .getElementsByClassName("display-flex")[0];

    let JSButton = buttons.getElementsByClassName("job-smith-button");
    if(!(JSButton.length>0)){
        const newButton = createJobSmithButton()
        buttons.appendChild(newButton)
        JSButton = buttons.getElementsByClassName("job-smith-button");
    }
    changeColorJobSmithButton();
    changeInnerJobSmithButton();

    // Frame
    const frameConteiner = document
    .getElementsByClassName("job-details-jobs-unified-top-card__container--two-pane")[0]
    .getElementsByClassName("mt5")[0]

    let JSFrame = frameConteiner.getElementsByClassName("job-smith-frame");
    if(!(JSFrame.length>0)){
        const newFrame = createJobSmithFrame()
        frameConteiner.appendChild(newFrame)
        JSFrame = buttons.getElementsByClassName("job-smith-frame");
    }

    changeInnerJobSmithFrame()

    const agentResponse = await chrome.storage.local.get(null)
    
    console.log(agentResponse)
       
}

function changeColorJobSmithButton(selectionProbabilities?:"Low"|"Medium"|"High"){
    
    const JSButton = document.getElementsByClassName("job-smith-button")[0] as HTMLElement;

    if(!selectionProbabilities){
        JSButton.style.backgroundColor = "#CCA349";
        return
    }

    switch(selectionProbabilities){
        case "Low":
            JSButton.style.backgroundColor = "#bd362f";
            break;
        case "Medium":
            JSButton.style.backgroundColor = "#f89406";
            break;
        case "High":
            JSButton.style.backgroundColor = "#51a351";
            break;
    }
}

function changeInnerJobSmithButton(selectionProbabilities?:"Low"|"Medium"|"High"){
    const JSButton = document.getElementsByClassName("job-smith-button")[0] as HTMLElement;

    if(!selectionProbabilities){
        JSButton.innerHTML = "...";
        return
    }

    JSButton.innerHTML = selectionProbabilities;
}

function changeInnerJobSmithFrame(agentResponse?:string){
    const JSFrame = document.getElementsByClassName("job-smith-frame")[0] as HTMLElement;

    if(!agentResponse){
        JSFrame.innerHTML = "...";
        return
    }

    JSFrame.innerHTML = agentResponse;
}

insertRecomendation()



chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.msg === 'agentResponse_saved') {
        console.log(message.data)
        changeColorJobSmithButton(message.data.selectionProbabilities)
        changeInnerJobSmithButton(message.data.selectionProbabilities)
        changeInnerJobSmithFrame(message.data.agentResponse)
        sendResponse("response")
    }
  })