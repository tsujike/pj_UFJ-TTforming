//LINE Business ID は tgrecords912@gmail.com / Tgglobal2015

class LINE {

  constructor() {
    this.LINE_ACCESSTOKEN = PropertiesService.getScriptProperties().getProperty("LINE_ACCESSTOKEN");
  }

  /** ブロードバンドメッセージ */
  sendBroadbandMessage(message) {

    // アクセストークン
    const url = 'https://api.line.me/v2/bot/message/broadcast';
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + this.LINE_ACCESSTOKEN
    };

    //メッセージ送信内容
    const payload = JSON.stringify({
      'messages': [{
        'type': 'text',
        'text': message
      }]
    })

    const options = {
      'headers': headers,
      'method': 'post',
      'payload': payload
    };

    // 送信
    UrlFetchApp.fetch(url, options);
    return "メッセージを送信しました"

  }

}


/**
 *  TEST用関数
 */
function testLINE() {

const l = new LINE();
const message = "テストです🚀"
console.log(l.sendBroadbandMessage(message));

}
