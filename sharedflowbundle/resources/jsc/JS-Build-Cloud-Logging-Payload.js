try{   
    //var payload = JSON.parse(context.getVariable("response.content")) || JSON.parse(context.getVariable("message.content"));
    var requestHeaders = JSON.parse(context.getVariable("flow.log.requestHeaders"));
    var responseHeaders = JSON.parse(context.getVariable("flow.log.responseHeaders"));
    var errorResponseString = context.getVariable("errorResponseString");
    
    var payload = {
    "mid": context.getVariable("messageid"),
    "tag": context.getVariable("organization.name") + "." + context.getVariable("environment.name"),
    "proxy": "[{ip:" + context.getVariable("proxy.client.ip") + "}]name:" + context.getVariable("proxy.name") + ")} path:{" + context.getVariable("proxy.basepath") + "}",
    "client": "[{" + context.getVariable('client.host') + "}]" + context.getVariable('client.ip') + ":" + context.getVariable("client.port"),
    "client_received": "{" + context.getVariable('client.received.start.timestamp') + "}-{" + context.getVariable('client.received.end.timestamp') + "}",
    "client_sent": "{" + context.getVariable('client.sent.start.timestamp') + "}-{" + context.getVariable('client.sent.end.timestamp') + "}",
    "request": "[{" + context.getVariable('request.verb') + "}]" + "{" + context.getVariable('request.uri') + "}",
    "request_headers":[ requestHeaders ], // For each important header replace HEADER_NAME
    "response":"{"+ context.getVariable('response.status.code') || context.getVariable('message.status.code') || context.getVariable('error.status.code') +"}",
    "response_headers": [ responseHeaders ],
        "error": errorResponseString,//"{error.status.code}-{error.reason.phrase}-{error.content}",
        "fault": "{}"//"{fault.name:None}-{fault.category}-{fault.subcategory}-{fault.reason}"
    };

    var logsPayload = JSON.stringify(payload);

    
    context.setVariable('logsPayload', logsPayload);
}   catch (error) {
    context.setVariable("flow.error.js.isError", true);
}