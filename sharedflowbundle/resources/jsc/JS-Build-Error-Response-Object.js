try {
    var statusCode = context.getVariable("message.status.code") || context.getVariable("response.status.code");
    var errorResponseString = "";

    if (statusCode === 200) {
        errorResponseString = "{}";
    } else {
        var errorStatusCode = context.getVariable("message.status.code") || context.getVariable("response.status.code");
        var errorReasonPhrase = context.getVariable("message.reason.phrase") || context.getVariable("response.reason.phrase") 
        var errorContent = context.getVariable("message.content") || context.getVariable("response.content");

        errorResponseString = errorStatusCode + "-" + errorReasonPhrase + "-" + errorContent;
    }

    context.setVariable("errorResponseString", errorResponseString);

} catch (error) {
    context.setVariable("flow.error.js.isError", true);
}
