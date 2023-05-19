/** TradingHistoryシートクラス */
//外部のスプレッドシートです//
//最終更新：2023/05/23
class TradingHistorySheet {

  /** コンストラクタ */
  constructor() {
    this.sheetName = `data`;
    this.TRADINGHISTORYSHEET_ID = PropertiesService.getScriptProperties().getProperty('TRADINGHISTORYSHEET_ID');
    this.sheet = SpreadsheetApp.openById(this.TRADINGHISTORYSHEET_ID).getSheetByName(this.sheetName);
  }


  /** ShipmentRecordをAppendRowするメソッド  */
  appendRowShipmentRecordToSheet() {

    const record = new ShipmentRecordSheet().createShipmentRecordSheetRecord();

    //2次元配列に戻して貼り付け
    const records = record.map(record => Object.values(record)).flat();
    this.sheet.appendRow(records);

    SpreadsheetApp.flush();
    console.log('02_Trading History(Overseas)に明細行を出力しました');
  }


}


/** TEST関数 */
function testTradingHistorySheet() {

  //Invoiceシートのインスタンス化
  const t = new TradingHistorySheet();

}
