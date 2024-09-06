try {    
    var rh = context.getVariable('request.headers.names');
    var s = String(rh);
    var list = s.substring(1, s.length - 1).split(new RegExp(', ', 'g'));
    var hash = {};
    list.forEach(function(headerName) {
      hash[headerName] = context.getVariable('request.header.' + headerName);
    });
    var requestHeadersObject = JSON.stringify(hash, null, 2);
    
    // Revisar que exista o no un Request Message (request payload)
    var content = context.getVariable('flow.request.message');
    
    if (content !== null && content !== "") {
        try {
            var requestContent = content;
            context.setVariable("flow.request.message", requestContent);
        } catch (error) {
            print("Error al analizar el contenido del mensaje de solicitud:", error);
        }
    } else {
        context.setVariable("flow.request.message", "{}");
    }
    
    context.setVariable("flow.log.requestHeaders", requestHeadersObject);
 
} catch (error){
    context.setVariable("flow.error.js.isError", true);
}