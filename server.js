
const express = require('express')
const line = require('@line/bot-sdk')
const restClient = new (require('node-rest-client').Client)

require('dotenv').config()
const app = express()
const config = {
    channelAccessToken: 'VsPqP4qFJwCTa8yjfMlSqmYzbhWMn0W9weOu7Tc9g5Ci7sO/Hit9wugxeroZySWMXHH9mYQfVNFDGPRnMeZcOcf+POw+HYWaCEd1O9fUVg5/Lbf0TSmwEyUfMUNvAjjxVwaOpOSWs6FB2AHZ0mUk9wdB04t89/1O/w1cDnyilFU=',
    channelSecret: '817d67a18ad5aa9196064cdb0bdf47bc'
  }

const client = new line.Client(config);

app.get('/', function (req, res) {
	res.send('03-pm2.5-bot')
})

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch(err => console.log('err', err))
});

function handleEvent(event) {
  if(event.type === 'message' && event.message.type === 'location') {
    return handleLocationEvent(event)
  }else {
    return Promise.resolve(null)
  }
}

function handleLocationEvent(event) {
  return new Promise((resolve, reject) => {
    restClient.get(`${process.env.apiUrl}?lat=${event.message.latitude}&long=${event.message.longitude}`, (data, response) => {
      if (data) {
        const pinData = data.map(row => ({
          "thumbnailImageUrl": row.aqi.icon,
          "imageBackgroundColor": "#FFFFFF",
          "title": `PM 2.5: ${row.aqi.aqi}`,
          "text": `${row.nameTH}, ${row.areaTH}`,
          "actions": [
            {
              "type": "uri",
              "label": "ข้อมูลย้อนหลัง",
              "uri": row.historyUrl
            }
          ]
        }))
    
        var msg = {
          "type": "template",
          "altText": "ข้อมูลสถานที่",
          "template": {
            "type": "carousel",
            "columns": pinData,
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
          }
        }

        resolve(client.replyMessage(event.replyToken, msg))
      } else {
        reject()
      }
    })
  })
 
}

app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})