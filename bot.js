'use strict'

const Slack = require('slack');


module.exports.run = async (data) => {
    const dataObject = JSON.parse (data.body);


    let response = {
        statusCode: 200,
        body : {},
        headers : {'X-Slack-No-Retry' : 1}
    }

    try {
        if ( !('X-Slack-Retry-Num' in data.headers) )
        {
            switch (dataObject.type) {
                case 'url_verification':
                    response.body = verifyCall (dataObject);
                    break;
                case 'event_callback':
    
                    if (dataObject.event.text == '/air'){
                        const params = {
                            token: 'xoxb-2369972885398-2510799287632-XyV48gTDWfze7wICPSwCfK7B',
                            channel: dataObject.event.channel,
                            text: 'This is where we connect to aws service and output air data (or other aws dataset) to user....',
                        }
        
                        Slack.chat.postMessage( params );
                    }
    
                    response.body = {ok: true}
    
                    break;
                    
                }
        }
    }
    catch ( err ) {

    }
    finally {
        return response;
    }

}

function verifyCall (data){
    if ( data.token == 'BMn3RrRp9PqRPCpiFi5kFUJs') {
        return data.challenge;
    }
    else {
        throw 'Verification failed';
    }
}