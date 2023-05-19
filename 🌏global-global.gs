function setPropertyStore() {

    //プロパティストアの選択
    const properties = PropertiesService.getScriptProperties();
    
    const LINE_ACCESSTOKEN = "pRpOVGFsBCRoeratQXgTfmvhRDhYS0eSVgUCO9Hvv3ShBVSg3tgttUdhoTdGO8iBOX5/JgVE2M8apqJzOIo9dpii+PviTH0VloB1+6LwmW4UL7pCfbVXir9ADm7AJagvw7yNVMHBmSBLY3QwSVjq2wdB04t89/1O/w1cDnyilFU=";
    properties.setProperty('LINE_ACCESSTOKEN', LINE_ACCESSTOKEN);

    //外部スプレッドシート

    const TRADINGHISTORYSHEET_ID = "1-CT9xm9R4opzqQioRg7tTtMJNkbk0X2tXD0n-e9zy_U";
    properties.setProperty('TRADINGHISTORYSHEET_ID', TRADINGHISTORYSHEET_ID);


    //インボイスNoの初期値
    const INVOICE_NO = "TGG999999";
    properties.setProperty('INVOICE_NO', INVOICE_NO);

    const ADMIN_EMAIL = "kenzo@jugani-japan.com";
    properties.setProperty('ADMIN_EMAIL', ADMIN_EMAIL);

}

