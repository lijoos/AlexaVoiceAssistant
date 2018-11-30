
 const request1 = require('request');
exports.handler = (event, context, callback) => {
    switch (event.request.type) {
        case "LaunchRequest":
            context.succeed(generateResponse(buildSpeechletResponse("Welcome to your personal voice Assistant Please ask me if you wanted to know about your pesonal id.", false)))
            break;
        case "IntentRequest":
            switch (event.request.intent.name) {
                case "personalDetailsIntent":
                    let value = "";
                    switch(event.request.intent.slots.pesonalID.value) {
                        case 'employee id':
                            value="employeeID";
                            break;
                        case 'license number':
                            value="licenseNumber";
                            break;
                    }
                    /*...................................*/
                    const url = `https://fcm.googleapis.com/fcm/send`;
                       const params = {
                            url: url,
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json',
                                       'Authorization': 'key=AAAAHa7No_Y:APA91bFnUxj-mDXy_PA7NFcH7oPR-Xsl31lUuTKkRgNWDa3SZBo9jFtAAwnjDQKjSdlW5Q9cm1C214gCf1gE1qHe1XmcFCl__vRD1EtWiT8x3Qmfz3Hw2Mw2ajQRSrKVOWAqQMRd_Ddi'},
                                       body: JSON.stringify({ 
                                         "notification": {
                                          "title": "Message From Alexa", 
                                          "body": "Please click here to see your "+value+" details",
                                          "click_action": "https://voiceassisstant-d4a87.firebaseapp.com/"+value
                                         },
                                         
                                         "to" : "eUCSPG7Sy58:APA91bHQSinxer6WslmHvFkxfTMrJt--5YRAcJ9oxlsaJ5oQrqnXnKCC-GEa3NUsykGU_PnCoJ2jedHZ6wJ-UXBPDo5gtS-Trq25srtSFh0_QUuB-9PUHVwliT7B8BsBN7DtRepbGkYz"
                                        })
                                       
                               };
                               request1.post(params, function (err, res, body) {
                                if (err) {
                                   context.succeed(generateResponse(buildSpeechletResponse("I am sorry Not able to Get your " + value, false)))
                                    console.log(err+"fffff");
                                } else {
                                   context.succeed(generateResponse(buildSpeechletResponse("Your "+value+" details forwarded ", false)))
                                    console.log(err,res.statusCode);
                                } });
                                    break;
                            }
        case "loveIntent":
              
            break;
    }

}
const buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }
}
const generateResponse = (speechletResponse) => {
    return {
        version: "1.0",
        response: speechletResponse
    }
}
const sendPushNotification=(value)=> {
               const url = `https://fcm.googleapis.com/fcm/send`;
               const params = {
                    url: url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                               'Authorization': 'key=AAAAHa7No_Y:APA91bFnUxj-mDXy_PA7NFcH7oPR-Xsl31lUuTKkRgNWDa3SZBo9jFtAAwnjDQKjSdlW5Q9cm1C214gCf1gE1qHe1XmcFCl__vRD1EtWiT8x3Qmfz3Hw2Mw2ajQRSrKVOWAqQMRd_Ddi'},
                               body: JSON.stringify({ 
                                 "notification": {
                                  "title": "Welcome message from alexa", 
                                  "body": "get your "+ value
                                 },
                                 "to" : "ePEIYIEOSFA:APA91bHwSHv_VPMVn_6D2GrUwD-KJ31vpI8VHsJ4pZd80LxGpkzcT41VkfRpGVwRcjdYYwPFuldMe1WSrwwkri6Wreme9th3GyKCAIxyEoui_91FEv5yFQlnB-gtqYxsCxCdXDHLD3OL"
                                })
                               
                       };
               request1.post(params, function (err, res, body) {
                if (err) {
                   context.succeed(generateResponse(buildSpeechletResponse("I am sorry Not able to Get your " + value, false)))
                    console.log(err+"fffff");
                } else {
                   context.succeed(generateResponse(buildSpeechletResponse("success" + res.statusCode, false)))
                    console.log(err,res.statusCode);
                }
    });
}