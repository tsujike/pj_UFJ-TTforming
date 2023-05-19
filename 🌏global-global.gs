//使い方
//2023/05/23 Kenny
//Github https://github.com/TeamTGGLOBAL/PJ17-InvoiceSystem-2023MAY

//✈️下準備
//0. LINEアカウントをお友達に追加してください https://lin.ee/39yv0xa6
//1. スプレッドシートは、コンサイニーごとに、コピーを作成してください
//2. Invoiceシートのヘッダー部（不変セルのみ）を作成してください。可変セル：I2,I3,I7,I8,I9
//3. コンテナバインドを開き、global.gsにあるsetPropertyStore()のSPREADSHEET_IDを修正します
//4. setPropertyStore()を実行します
//4-1. アクセストークンやURLを変更したいばあいは、管理者に連絡してください

//✈️出荷準備（オーダー確定後）
//0. DHLへのBookingRequestを完了してください
//1. Dataシートに商品明細を入力
//2. Dataシートの商品明細を確認してください
//3. カスタムメニュー（左）の「🚀Setup InvoiceNo」を実行（インボイスNoを入力）
//4. カスタムメニュー（左）の「🚀書類一括作成」を実行
//4-1. サブメニューの「🥑個別作成」を一括実行と同じ意味です（後述します）
//5. カスタムメニュー（右）の「🚀出荷処理一括実行」を実行
//5-1. サブメニューの「🥑個別実行」を一括実行と同じ意味です（後述します）
//6. Gmail下書きが作成されていますので、原産地証明書や衛生証明書を添付して送信してください


function setPropertyStore() {

    //プロパティストアの選択
    const properties = PropertiesService.getScriptProperties();

    const LINE_ACCESSTOKEN = "pRpOVGFsBCRoeratQXgTfmvhRDhYS0eSVgUCO9Hvv3ShBVSg3tgttUdhoTdGO8iBOX5/JgVE2M8apqJzOIo9dpii+PviTH0VloB1+6LwmW4UL7pCfbVXir9ADm7AJagvw7yNVMHBmSBLY3QwSVjq2wdB04t89/1O/w1cDnyilFU=";
    properties.setProperty('LINE_ACCESSTOKEN', LINE_ACCESSTOKEN);

    const SPREADSHEET_ID = "12t-7Pja4xekPH2kM1Ue6oyK224hjTpwEr3vlB10O5PE";
    properties.setProperty('SPREADSHEET_ID', SPREADSHEET_ID);

    //外部スプレッドシート
    const MASTERSEAFOODSHEET_ID = "16WGPIu4xoykrh_aQ70EsbEl7FRKD4jvTgcxM_jS9ZzU";
    properties.setProperty('MASTERSEAFOODSHEET_ID', MASTERSEAFOODSHEET_ID);

    const TRADINGHISTORYSHEET_ID = "1-CT9xm9R4opzqQioRg7tTtMJNkbk0X2tXD0n-e9zy_U";
    properties.setProperty('TRADINGHISTORYSHEET_ID', TRADINGHISTORYSHEET_ID);

    const CUSTOMERSSHEET_ID = "1rqNqrKBqVx-K9kBG4XZARvZyUi8_hkwhmD4Sr3x_Fto";
    properties.setProperty('CUSTOMERSSHEET_ID', CUSTOMERSSHEET_ID);

    const DHLSHEET_ID = "15rhIJupgjlgsqRkqZPbMZK_wNPbhTTYvwNJsVu_mIEo";
    properties.setProperty('DHLSHEET_ID', DHLSHEET_ID);

    //作業用フォルダ
    const SALESDEPTFOLDER_ID = "1yOB0FqGXPUbUja3WYd1A_pZA7MyEAqx1";
    properties.setProperty('SALESDEPTFOLDER_ID', SALESDEPTFOLDER_ID);

    //インボイスURLの初期値
    const INVOICE_URL = "https://docs.google.com/spreadsheets/d/1HKE6SIvm5Z0vg01o4fE179JNHJmB7Bdp5PdiB6sqzBk/edit#gid=0";
    properties.setProperty('INVOICE_URL', INVOICE_URL);

    //カスタムインボイスURLの初期値
    const CUSTOMINVOICE_URL = "https://docs.google.com/spreadsheets/d/1HKE6SIvm5Z0vg01o4fE179JNHJmB7Bdp5PdiB6sqzBk/edit#gid=0";
    properties.setProperty('CUSTOMINVOICE_URL', CUSTOMINVOICE_URL);

    //パッキングリストURLの初期値
    const PACKINGLIST_URL = "https://docs.google.com/spreadsheets/d/1HKE6SIvm5Z0vg01o4fE179JNHJmB7Bdp5PdiB6sqzBk/edit#gid=0";
    properties.setProperty('PACKINGLIST_URL', PACKINGLIST_URL);

    //搬入情報URLの初期値
    const TRANSPORT_URL = "https://docs.google.com/spreadsheets/d/1HKE6SIvm5Z0vg01o4fE179JNHJmB7Bdp5PdiB6sqzBk/edit#gid=0";
    properties.setProperty('TRANSPORT_URL', TRANSPORT_URL);
    
    //インボイスNoの初期値
    const INVOICE_NO = "TGG999999";
    properties.setProperty('INVOICE_NO', INVOICE_NO);

    const ADMIN_EMAIL = "kenzo@jugani-japan.com";
    properties.setProperty('ADMIN_EMAIL', ADMIN_EMAIL);

    // const TESTUSER_ID = "ここにユーザーIDを入力して実行する";
    // properties.setProperty('TESTUSER_ID', TESTUSER_ID);
}



/**
* getInvoiceNoInPropstore()から現在のinvoiceNoを呼び、OKならそのまま、CANCELなら新しいNoを入力してもらう関数
* カスタムメニューから実行する
* @return{void}
*/
function setupInvoiceNo() {

    //プロパティストアの選択
    const properties = PropertiesService.getScriptProperties();

    //プロパティストアに格納されているinvoiceNoを取得する
    const currentInvoiceNo = properties.getProperty('INVOICE_NO');

    //ユーザーに確認を促す
    const ui = SpreadsheetApp.getUi();
    const checkInvoiceNo = ui.alert("InvoiceNoは  " + "『" + currentInvoiceNo + "』", "実行 = OK // 新しいNoを入力 = CANCEL ", ui.ButtonSet.OK_CANCEL);

    //ユーザーの選択によって処理を分岐
    switch (checkInvoiceNo) {
        case ui.Button.OK:
            break;
        case ui.Button.CANCEL:
            const response = ui.prompt("新しいinvoiceNoを入れてください", ui.ButtonSet.OK_CANCEL);

            //InvoiceNoをプロパティストアに格納する
            const INVOICE_NO = response.getResponseText();
            properties.setProperty("INVOICE_NO", INVOICE_NO);

            //ConsigneeCodeをプロパティストアに格納する
            const CONSIGNEE_CODE = INVOICE_NO.match(/^[A-Za-z]{3}/)[0];
            properties.setProperty('CONSIGNEE_CODE', CONSIGNEE_CODE);

            //ConsigneeNameをプロパティストアに格納する
            const c = new CustomersSheet();
            const CONSIGNEE_NAME = c.getConsigneeNameByCode(CONSIGNEE_CODE);
            properties.setProperty('CONSIGNEE_NAME', CONSIGNEE_NAME);

            //CustomerCodeをプロパティストアに格納する            
            const CUSTOMER_CODE = c.getCustomerCodeByCode(CONSIGNEE_CODE);
            properties.setProperty('CUSTOMER_CODE', CUSTOMER_CODE);

            //CustomerNameをプロパティストアに格納する
            const CUSTOMER_NAME = c.getCustomerNameByCode(CUSTOMER_CODE);
            properties.setProperty('CUSTOMER_NAME', CUSTOMER_NAME);

            break;
        default:
    }
}
