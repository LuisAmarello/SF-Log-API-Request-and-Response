    function getData(inputData) {
        if (Array.isArray(inputData)) {
            return inputData.map(function(item) {
                return Object.assign({}, item);
            });
        } else if (typeof inputData === 'object') {
            return Object.assign({}, inputData);
        }
        return "";
    }
    
    // Función para enmascarar los campos requeridos
    function maskFields(inputData, fieldsToMask) {
        if (Array.isArray(inputData)) {
            return inputData.map(function(item) {
                return maskFields(item, fieldsToMask);
            });
        } else if (typeof inputData === 'object' && inputData !== null) {
            var maskedObj = {};
            for (var field in inputData) {
                if (inputData.hasOwnProperty(field)) {
                    var maskRule = fieldsToMask[field];
                    if (maskRule) {
                        if (typeof maskRule === 'string') {
                            maskedObj[field] = maskRule;
                        } else if (typeof maskRule === 'function') {
                            maskedObj[field] = maskRule(inputData[field]);
                        }
                    } else if (typeof inputData[field] === 'object') {
                        maskedObj[field] = maskFields(inputData[field], fieldsToMask);
                    } else {
                        maskedObj[field] = inputData[field];
                    }
                }
            }
            return maskedObj;
        }
        return inputData;
    }

try {
    var requestHeaders = JSON.parse(context.getVariable('flow.log.requestHeaders'));
    //var requestBody = JSON.parse(context.getVariable('requestTextPayload'));

    

    // Datos y Reglas para enmascarar los campos del RequestBody
    var fieldsToMaskRequestBody = {
        "AccountNumber": function(value) {
            return "*".repeat(value.length - 4) + value.slice(-4);
        }
    };

    // Datos y Reglas para enmascarar los campos de los Request Headers
    var fieldsToMaskRequestHeaders = {
        "x-ssl-cert": "*****",
        "b-application": function(value) {
            return "*".repeat(value.length - 5) + value.slice(-5);
        },
        "authorization": "****",
        "clientcertificate": "****"
    };

    var maskedRequestBody = maskFields(getData(requestBody), fieldsToMaskRequestBody);
    var maskedRequestHeaders = maskFields(getData(requestHeaders), fieldsToMaskRequestHeaders);

    var updatedRequestHeaders = JSON.stringify(maskedRequestHeaders);
    var updatedRequestBody = JSON.stringify(maskedRequestBody);

    context.setVariable("flow.log.processRequestHeaders", updatedRequestHeaders);
    context.setVariable("flow.request.processMessage", updatedRequestBody);

} catch (error) {
    context.setVariable("flow.error.js.isError", true);
}
