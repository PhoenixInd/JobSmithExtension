function cleanHTMLTags(htmlComponent){
    let clearTags = htmlComponent.replaceAll(/<[^>]*>/g, " ");
    let trimText = clearTags.trim()
    return trimText
}


function getLinkdinComponents(){
    let description = document.getElementsByClassName("jobs-description__container")[0].getElementsByClassName("mt4")[0].innerHTML;
    let title = document.getElementsByClassName("job-details-jobs-unified-top-card__container--two-pane")[0].getElementsByClassName("job-details-jobs-unified-top-card__job-title")[0].innerHTML;
    let company_name = document.getElementsByClassName("jobs-company__box")[0].getElementsByClassName("artdeco-entity-lockup__title")[0].innerHTML;

    let job_info = {
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
    console.log(job_info)
}

getLinkdinComponents()