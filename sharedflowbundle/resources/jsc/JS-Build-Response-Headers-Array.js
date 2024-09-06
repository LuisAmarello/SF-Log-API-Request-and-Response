try {    
        var rh = context.getVariable('response.headers.names') || context.getVariable('message.headers.names');
        var s = String(rh);
        // convert the list of header names to an array:
        var list = s.substring(1, s.length - 1).split(new RegExp(', ', 'g'));
        var hash = {};
        list.forEach(function(headerName) {
          hash[headerName] = context.getVariable('response.header.' + headerName) || context.getVariable('message.header.' + headerName);
        });
        var responseHeadersObject = JSON.stringify(hash, null, 2);
        
        context.setVariable("flow.log.responseHeaders", responseHeadersObject);
} catch (error){
    context.setVariable("flow.error.js.isError", true);
}