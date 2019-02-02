const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const Client = require('@line/bot-sdk').Client;
const app = express()
const config = {
  channelAccessToken: 'VsPqP4qFJwCTa8yjfMlSqmYzbhWMn0W9weOu7Tc9g5Ci7sO/Hit9wugxeroZySWMXHH9mYQfVNFDGPRnMeZcOcf+POw+HYWaCEd1O9fUVg5/Lbf0TSmwEyUfMUNvAjjxVwaOpOSWs6FB2AHZ0mUk9wdB04t89/1O/w1cDnyilFU=',
  channelSecret: '817d67a18ad5aa9196064cdb0bdf47bc'
}
const client = new Client(config);



app.get('/', function (req, res) {
  res.send('Hello World!!')

})



app.post('/webhook', middleware(config), (req, res) => {
  // req.body.events // webhook event objects
  // req.body.destination // user ID of the bot (optional)
  res.send("Hi Dude!!")
  const event = req.body.events[0];
  if (event.type === 'message') {
    const message = event.message;
    console.log(message);
    // client.replyMessage(event.replyToken, {
    //   type: 'text',
    //   text: message.type,
    // })
    // client.replyMessage(event.replyToken, 
    //   {
    //     "type": "template",
    //     "altText": "This is a buttons template",
    //     "template": {
    //         "type": "buttons",
    //         "thumbnailImageUrl": "https://pbs.twimg.com/media/Dh6ZQvGVMAE7LFF.jpg",
    //         "imageAspectRatio": "rectangle",
    //         "imageSize": "cover",
    //         "imageBackgroundColor": "#09F1F9",
    //         "title": "Mind",
    //         "text": "Pisit Boonklod",
    //         "defaultAction": {
    //             "type": "uri",
    //             "label": "View detail",
    //             "uri": "http://google.com/"
    //         },
    //         "actions": [
    //             {
    //               "type": "uri",
    //               "label": "Facebook",
    //               "uri": "https://www.facebook.com/pisit.boonklod"
    //             },
    //             {
    //               "type": "message",
    //               "label": "Add to cart",
    //               "text": "ใส่ไปเรื่อยเดี๋ยวตีเลย"
    //             },
    //             {
    //               "type": "uri",
    //               "label": "CPE",
    //               "uri": "http://cpe.eng.cmu.ac.th/2013"
    //             }
    //         ]
    //     }
      // })
      client.replyMessage(event.replyToken, {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                  "thumbnailImageUrl": "https://pbs.twimg.com/media/Dh6ZQvGVMAE7LFF.jpg",
                  "imageBackgroundColor": "#0000FF",
                  "title": "Pun",
                  "text": "Hello",
                  "actions": [
                      {  
                          "type":"message",
                          "label":"เพิ่มสินค้า",
                          "text": "ไม่มีอะไรจะขายแล้วว"
                      },
                      {  
                        "type":"uri",
                        "label":"Facebook",
                        "uri":"https://www.facebook.com/bnk48official.pun"
                     }
                  ]
                },
                {
                  "thumbnailImageUrl": "https://c.76.my/Malaysia/line-brown-bear-cute-pencil-case-ubiyo-1802-02-Ubiyo@6.jpg",
                  "imageBackgroundColor": "#0000FF",
                  "title": "Cherprang",
                  "text": "Hi~~",
                  "actions": [
                    {
                      "type":"datetimepicker",
                      "label":"Select date",
                      "data":"storeId=12345",
                      "mode":"datetime",
                      "initial":"2017-12-25t00:00",
                      "max":"2018-01-24t23:59",
                      "min":"2017-12-25t00:00"
                    },
                    {  
                      "type":"uri",
                      "label":"Facebook",
                      "uri":"https://www.facebook.com/bnk48official.cherprang/?ref=br_rs"
                   }
                ]
                }
            ],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
    })
  }
})


app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})