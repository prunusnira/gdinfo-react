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
const txtCntRank = {
    title: {
        "jp":"プレイカウントランキング",
        "ko":"플레이 카운트 랭킹",
        "en":"Play count ranking"
    },
    desc: {
        desc1: {
            "jp":"プレイ数を非公開に設定: 名、プロフィールのリンクを未表示",
            "ko":"플레이 수 비공개 유저: 이름, 프로필 페이지 링크 미표기",
            "en":"Private option > Name, profile link disappear"
        },
        desc2: {
            "jp":"プレイ数 = ステージの数",
            "ko":"플레이 수 = 스테이지 수",
            "en":"Play count = Number of stages"
        },
        desc3: {
            "jp":"正確なプレイ回数は全曲更新のデータが必要となります",
            "ko":"정확한 플레이 카운트를 알기 위해서는 전곡 데이터가 필요합니다.",
            "en":"For exact count, you need to update all patterns"
        }
    },
    table: {
        emptyname: {
            "jp":"非公開",
            "ko":"비공개",
            "en":"Not displayed"
        }
    }
};

export default txtCntRank;