var Slack = require('slack-node');
const fetch = require('node-fetch');


webhookUri = "https://hooks.slack.com/services/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";
const api = "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=1&page=1&offset=0&sort=desc&radius=1000&country_id=NZ&order_by=lastUpdated&dumpRaw=false"

let settings = { method: "Get" };

fetch(api, settings)
    .then(res => res.json())
    .then((json) => {
        const data = JSON.stringify(json).toString();
        console.log(data);

        slack = new Slack();
        slack.setWebhook(webhookUri);
         
        slack.webhook({
          channel: "#test",
          username: "webhookbot",
          text: data,
        }, function(err, response) {
          console.log(response);
        });
        

    });
 



