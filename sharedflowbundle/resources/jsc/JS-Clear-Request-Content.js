try {
    content = context.getVariable('request.content');
    if (content === "") {
        context.setVariable("requestTextPayload", "{}");
    } else {
        try {
            var cont = JSON.parse(content);
            context.setVariable("requestTextPayload", JSON.stringify(cont));
        } catch (stringRequestContent) {
            context.setVariable("requestTextPayload", content);
        }
    }
} catch (error) {
    context.setVariable("flow.error.js.isError", true);
}
