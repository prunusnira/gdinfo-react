export default class CommonData {
    static MAINURL = "https://sindata.nira.one/";
    static TESTURL = "http://localhost:8080/";

    static url = CommonData.MAINURL;
    //static url = CommonData.TESTURL;

    static currentVersion = 30;
    static googleLoginClientId =
        "480545727884-oup0gshcscesa4fq3s8rhoh4tpeopcha.apps.googleusercontent.com";

    static dataUrl = CommonData.url;
    static jacketUrl =
        "https://s3-bc-imgserv.s3.ap-northeast-2.amazonaws.com/sinjacket/";

    static encKey = "sindata";

    static internalVersion = 0;
}
