/*****************************************************
 * GITADORA Info Server
 * Developed by Tae Jun Kang a.k.a Prunus Nira
 * (c) Nira 2016
 *
 * 1. This project is protected under GNU AGPL v3.0
 *    Please refer to LICENSE file on root
 * 2. Also, products and libraries used to implement
 *    this server are on USED-LIBRARIES file on root
 *****************************************************/
const txtTerms = {
    title: {
        "jp":"使用上の注意",
        "ko":"사용상의 주의",
        "en":"Precautions"
    },
    s1t: {
        "jp":"1. 禁止事項",
        "ko":"1. 금지 사항",
        "en":"1. Prohibition"
    },
    s1c1: {
        "jp":"下記の行為は記録抹消やIP遮断などの利用制限が受けることができます",
        "ko":"다음의 경우 기록 삭제, IP차단 등을 통해 서비스 이용에 제한을 받을 수 있습니다",
        "en":"You can have restriction (Record delete, IP block) on using service by:"
    },
    s1c2: {
        "jp":"1) サーバーに負担をかける行為",
        "ko":"1) 서버에 부하를 가하는 행위",
        "en":"1) Making server overloaded"
    },
    s1c3: {
        "jp":"2) アップロードするjsonを操作して記録を変える行為",
        "ko":"2) 업로드하는 json을 변조하여 기록을 조작하는 행위",
        "en":"2) Illegally modifying json which is uploaded to server which makes record fudged"
    },
    s1c4: {
        "jp":"3) 本サービスの利用して金銭的利益を得る行為",
        "ko":"3) 본 사이트를 사용하여 금전적 이득을 취하는 행위",
        "en":"3) Taking economical advantage through this site"
    },
    s2t: {
        "jp":"2. 限界",
        "ko":"2. 한계점",
        "en":"2. Limitations"
    },
    s2c1: {
        "jp":"1) 個人運営のサービスなので状況によってはサービスが中止になる可能性もあります",
        "ko":"1) 개인이 운영하는 서비스이므로 상황에 따라 서비스 운영이 중지될 수 있습니다",
        "en":"1) As this service is operated by one person, it can be shutdown any time"
    },
    s2c2: {
        "jp":"2) (５年間一度もなかったんですけど) 利用中eAmusementからの警告や制限が起きる場合、運営から助けを提供することはできません",
        "ko":"2) (이런 경우는 5년간 한 번도 없었습니다만) 이 서비스로 인해 eAmusement 제재나 밴을 당하는 것에 대해서는 운영자가 도움을 드릴 방법은 없습니다",
        "en":"2) (It never happened for 5 years but) If you get restriction or ban from eAmusement service, we can't help it. Sorry."
    },
    s3t: {
        "jp":"3. 収集情報",
        "ko":"3. 수집 정보",
        "en":"3. Data collected"
    },
    s3c1: {
        "jp":"サービス提供のため下記のデータを利用者から取得します",
        "ko":"서비스 제공을 위해 사용자로부터 다음의 내용을 수집합니다.",
        "en":"These data are collected to provide proper service"
    },
    s3c2: {
        "jp":"1) Googleアカウントに登録されたe-mailアドレス",
        "ko":"1) Google 계정에 등록한 이메일 주소",
        "en":"1) Google e-mail address"
    },
    s3c3: {
        "jp":"2) eAmusementに登録されたGITADORAのプレイデータ",
        "ko":"2) eAmusement에 등록된 GITADORA 플레이 데이터",
        "en":"2) GITADORA play data registered on eAmusement"
    },
    s4: {
        "jp":"* この文書は韓国語版を訳して掲載しているので正確な意味については原文を参考にしてください。",
        "ko":"* 이 문서는 한국어가 원문입니다",
        "en":"* This document is translated version from Korean"
    }
};

export default txtTerms;