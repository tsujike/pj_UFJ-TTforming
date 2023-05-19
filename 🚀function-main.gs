/**
* フォーム回答を2次元配列に格納するパーツ
* （コンテナバインドに書いてフォーム送信時をトリガーにするよ）
* param{obj} eventオブジェクト
*/
function onFormSubmit(e) {

  //認証を取る為に一回必要
  //FormApp.getActiveForm();

  const itemResponses = e.response.getItemResponses();

  // itemResponsesを配列に変換
  const itemResponsesArray = itemResponses.map(itemresponse => itemresponse.getResponse())

  const recipient = ""
  const subject = ""
  const body = itemResponsesArray

  GmailApp.createDraft(recipient, subject, body);

  //シートには必ず貼り付け
  new TradingHistorySheet().sheet.appendRow(itemResponsesArray);

  //各クライアントシートにも貼り付ける
  // const customersKey = values[2];
  // sheet = ss.getSheetByName(customersKey);
  // sheet.appendRow(values);

    //LINE通知する
    const customerCode = itemResponsesArray[2];
    const amountPrice = itemResponsesArray[3];
    message = `【海外送金】${customerCode}:TGに${amountPrice}が入金されました💵`;
    new LINE().sendBroadbandMessage(message);
    console.log(message);

}
