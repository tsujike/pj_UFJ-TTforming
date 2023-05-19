/**
* フォーム回答を2次元配列に格納するパーツ
* （コンテナバインドに書いてフォーム送信時をトリガーにするよ）
* param{obj} eventオブジェクト
*/
function onFormSubmit(e) {
  
  //認証を取る為に一回必要
  //FormApp.getActiveForm();
  
  const itemResponses = e.response.getItemResponses();
  
  //貼り付け用のValuesを作成＋＋ここから＋＋
  const values = [];
  for(const itemResponse of itemResponses) {
    values.push(itemResponse.getResponse());
  }
  
  values.splice(1,0,'');
  values.splice(5,0,'','','');
  //＋＋ここまで＋＋
  
  
  //mainシートには必ず貼り付け
  let sheet;
  const ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1-CT9xm9R4opzqQioRg7tTtMJNkbk0X2tXD0n-e9zy_U/edit');
  sheet    = ss.getSheetByName('data');
  sheet.appendRow(values);
  
  //各クライアントシートにも貼り付ける
  const customersKey = values[2];
  sheet = ss.getSheetByName(customersKey);
  sheet.appendRow(values);
  
}
