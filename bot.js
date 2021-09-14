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
    
                    if (dataObject.event.text == 'Hello'){
                        const params = {
                            token: 'xoxb-2369972885398-2510799287632-Hrklzo5A0YOJ3CLGFyl5aDgI',
                            channel: dataObject.event.channel,
                            text: '--> connect me to AWS dataset <--',
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