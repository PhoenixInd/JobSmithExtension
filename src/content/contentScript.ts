// Process html

interface JobProcessedInfo{
    description: string,
    title: string,
    company_name: string,
}

function cleanHTMLTags(htmlComponent:string){
    let clearTags = htmlComponent.replaceAll(/<[^>]*>/g, " ");
    let trimText = clearTags.trim()
    return trimText
    }
    
function getLinkdinJob(){
  console.log("get linkedin")
    let description = document.getElementsByClassName("jobs-description__container")[0].getElementsByClassName("mt4")[0].innerHTML;
    let title = document.getElementsByClassName("job-details-jobs-unified-top-card__container--two-pane")[0].getElementsByClassName("job-details-jobs-unified-top-card__job-title")[0].innerHTML;
    let company_name = document.getElementsByClassName("jobs-company__box")[0].getElementsByClassName("artdeco-entity-lockup__title")[0].innerHTML;
    
    let job_info:JobProcessedInfo = {
      title: "",
      description: "",
      company_name: "",
    }
    
    if(description){
      job_info["description"] = cleanHTMLTags(description)
    }
    if(title){
      job_info["title"] = cleanHTMLTags(title)
    }
    if(company_name){
      job_info["company_name"] = cleanHTMLTags(company_name)
    }
    
    return job_info
}

(async function(test) {
  console.log(test)
    chrome.runtime.sendMessage({
      type: 'SCRAPED_DATA',
      data: getLinkdinJob()
    });
})();

export default JobProcessedInfo