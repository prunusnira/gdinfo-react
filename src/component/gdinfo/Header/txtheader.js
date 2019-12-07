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
const txtHeader = {
    test: {
        "jp":"サイトのアドレスをsin.nira.oneに変更しました。gitadora.infoは2020年4月13日まで使えます。",
        "ko":"사이트의 주소를 sin.nira.one으로 변경하였습니다. gitadora.info는 2020년 4월 13일까지 사용 가능합니다.",
        "en":"Address is changed to sin.nira.one . gitadora.info can be used until Apr. 13, 2020"
    },
    howtouse: {
        title: {
            "jp":"使い方",
            "ko":"사용방법",
            "en":"How to use"
        },
        update_au: {
            "jp":"自動更新",
            "ko":"자동 갱신",
            "en":"Auto update"
        },
        update_man: {
            "jp":"手動更新",
            "ko":"수동 갱신",
            "en":"Manual update"
        },
        filter_rival: {
            "jp":"フィルター・ライバル",
            "ko":"필터, 라이벌",
            "en":"Filter, rival"
        }
    },
    mymenu: {
        title: {
            "jp":"Myギタドラ",
            "ko":"내 기타도라",
            "en":"My GITADORA"
        },
        profile: {
            "jp":"プロフィール",
            "ko":"내 프로필",
            "en":"My profile"
        },
        gfskill: {
            "jp":"GFスキル",
            "ko":"내 GF스킬",
            "en":"My GF skill"
        },
        dmskill: {
            "jp":"DMスキル",
            "ko":"내 DM스킬",
            "en":"My DM skill"
        },
        best: {
            "jp":"プレイ回数",
            "ko":"플레이 횟수",
            "en":"Most played"
        },
        notplayed: {
            "jp":"未プレイ譜面",
            "ko":"미 플레이 패턴",
            "en":"Patterns not played"
        },
        cleartable: {
            "jp":"クリアテーブル",
            "ko":"클리어 테이블",
            "en":"Clear table"
        },
        rivallist: {
            "jp":"ライバルリスト",
            "ko":"라이벌 리스트",
            "en":"Rival list"
        },
        snapshot: {
            "jp":"スキル表保管箱",
            "ko":"스킬표 보관함",
            "en":"Skill Table Snapshot"
        }
    },
    skill: {
        title: {
            "jp":"スキル",
            "ko":"스킬",
            "en":"Skill"
        },
        rank: {
            "jp":"ランキング",
            "ko":"스킬랭킹",
            "en":"Skill ranking"
        },
        exc: {
            "jp":"スキル理論値",
            "ko":"스킬 이론치",
            "en":"Theoretical Skill"
        }
    },
    pattern: {
        title: {
            "jp":"譜面",
            "ko":"패턴",
            "en":"Pattern"
        },
        ptlist: {
            "jp":"譜面リスト",
            "ko":"패턴목록",
            "en":"Pattern List"
        }
    },
    tower: {
        title: {
            "jp":"ザ・タワー",
            "ko":"타워",
            "en":"The Tower"
        }
    },
    etc: {
        title: {
            "jp":"その他",
            "ko":"부가기능",
            "en":"Others"
        },
        countrank: {
            "jp":"プレイカウントランキング",
            "ko":"플레이 카운트 랭킹",
            "en":"Play count ranking"
        }
    },
    login: {
        "jp":"加入・ログイン",
        "ko":"가입/로그인",
        "en":"Sign in/up"
    },
    logout: {
        "jp":"ログアウト",
        "ko":"로그아웃",
        "en":"Sign out"
    }
};

export default txtHeader;