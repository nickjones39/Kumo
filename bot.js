'use strict'

const Slack = require('slack');
const fetch = require('node-fetch');

const api = "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=1&page=1&offset=0&sort=desc&radius=1000&country_id=NZ&order_by=lastUpdated&dumpRaw=false"

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
                    let s = dataObject.event.text;
                    if (s.includes("AQ")) {
                        let q = s.split(" ");
                        let city = q[1].toLowerCase(); 
                        let settings = { method: "Get" };
                        fetch(api, settings)
                            .then(res => res.json())
                            .then((json) => {
                                const data = JSON.stringify(json).toString();
                                let datas = data.split("}");
                                const params = {
                                    token: '',
                                    channel: dataObject.event.channel,
                                    text: '|||||**** --> ' + datas[0] + ' You want to look up: ' + city + '<-- ****|||||',
                                }
                                Slack.chat.postMessage( params );
                                response.body = {ok: true}
                            });
                    }
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
    if ( data.token == '') {
        return data.challenge;
    }
    else {
        throw 'Verification failed';
    }
}