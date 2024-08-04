(function() {
    // Extrae el título de la página y el contenido
    const pageTitle = document.title;
    const pageContent = document.body.innerText; // O cualquier otra lógica para extraer la información necesaria
    const pageHtml = document.documentElement.outerHTML;

    // Selecciona el recuadro si ya existe
    let messageBox = document.getElementById('job-status-box');

    if (!messageBox) {
        // Si el recuadro no existe, créalo
        
        messageBox = document.createElement('div');
        if (pageTitle.includes("LinkedIn")) {
            messageBox.id = 'job-status-box'; // Asigna un ID único al recuadro
            messageBox.style.position = 'fixed';
            messageBox.style.bottom = '10px';
            messageBox.style.right = '10px';
            messageBox.style.padding = '10px';
            messageBox.style.borderRadius = '5px';
            messageBox.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
            messageBox.style.zIndex = '10000'; // Asegúrate de que esté sobre otros elementos
            messageBox.style.backgroundColor = 'rgba(0, 128, 0, 0.8)'; // Color verde con opacidad
            messageBox.textContent = 'Es una oferta';
            document.body.appendChild(messageBox);
        }
    }else{
        if(pageTitle.includes("LinkedIn")){
            messageBox.style.backgroundColor = 'rgba(0, 128, 0, 0.8)'; // Color verde con opacidad 
        }else{
            messageBox.remove();
        }
    }

    // Envía los datos al background script
    chrome.runtime.sendMessage({
      type: 'SCRAPED_DATA',
      data: {
        title: pageTitle,
        content: pageContent,
        html: pageHtml
      }
    });
})();
