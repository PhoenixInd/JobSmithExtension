// Process html

interface JobProcessedInfo{
    description: string,
    title: string,
    company_name: string,
}

function cleanHTMLTags(htmlComponent:string){
    const clearTags = htmlComponent.replaceAll(/<[^>]*>/g, " ");
    const trimText = clearTags.trim()
    return trimText
    }
    
function getLinkdinJob(){
  console.log("get linkedin")
    const description = document.getElementsByClassName("jobs-description__container")[0].getElementsByClassName("mt4")[0].innerHTML;
    const title = document.getElementsByClassName("job-details-jobs-unified-top-card__container--two-pane")[0].getElementsByClassName("job-details-jobs-unified-top-card__job-title")[0].innerHTML;
    const company_name = document.getElementsByClassName("jobs-company__box")[0].getElementsByClassName("artdeco-entity-lockup__title")[0].innerHTML;
    
    const job_info:JobProcessedInfo = {
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

function waitForJobElements() {
  return new Promise<void>((resolve) => {
      const observer = new MutationObserver((mutations, observer) => {
        const description = document.getElementsByClassName("jobs-description__container")[0].getElementsByClassName("mt4")[0].innerHTML;
        const title = document.getElementsByClassName("job-details-jobs-unified-top-card__container--two-pane")[0].getElementsByClassName("job-details-jobs-unified-top-card__job-title")[0].innerHTML;
        const company_name = document.getElementsByClassName("jobs-company__box")[0].getElementsByClassName("artdeco-entity-lockup__title")[0].innerHTML;

          if (description && title && company_name) {
              observer.disconnect();
              resolve();
          }
      });

      observer.observe(document.body, { childList: true, subtree: true });
  });
}

(async function () {
  await waitForJobElements();
  chrome.runtime.sendMessage({
      type: 'SCRAPED_DATA',
      data: getLinkdinJob()
  });
})();

export default JobProcessedInfo