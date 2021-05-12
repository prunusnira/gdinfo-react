const HeaderNavData = {
    title: {
        url: "/index"
    },
    mydata: {
        text: {
            jp:"マイデータ",
            ko:"내 데이터",
            en:"My Data"
        },
        sub: [
            {
                title: {
                    jp:"プロフィール",
                    ko:"프로필",
                    en:"Profile"
                },
                link: "/profile"
            },
            {
                title: {
                    jp:"GFスキル",
                    ko:"GF스킬",
                    en:"GF skill"
                },
                link: "/myskill/gf"
            },
            {
                title: {
                    jp:"DMスキル",
                    ko:"DM스킬",
                    en:"DM skill"
                },
                link: "/myskill/dm"
            },
            {
                title: {
                    jp:"プレイ数",
                    ko:"플레이 횟수",
                    en:"Most played"
                },
                link: "/mybest"
            },
            {
                title: {
                    jp:"スキル表保管箱",
                    ko:"스킬표 보관함",
                    en:"Skill Table Snapshot"
                },
                link: "/snapshot"
            },
        ]
    },
    skill: {
        text: {
            jp:"スキル",
            ko:"스킬",
            en:"Skill"
        },
        sub: [
            {
                title: {
                    jp:"最近の更新リスト",
                    ko:"최근 갱신 유저",
                    en:"Recent updated users"
                },
                link: "/recent"
            },
            {
                title: {
                    jp:"ランキング",
                    ko:"스킬랭킹",
                    en:"Skill ranking"
                },
                link: "/rank/gf/1"
            },
            {
                title: {
                    jp:"スキル理論値",
                    ko:"스킬 이론치",
                    en:"Theoretical Skill"
                },
                link: "/exc/gf"
            },
            {
                title: {
                    jp:"プレイカウントランキング",
                    ko:"플레이 카운트 랭킹",
                    en:"Play count ranking"
                },
                link: "/cntrank/1"
            },
        ]
    },
    pattern: {
        text: {
            jp:"譜面",
            ko:"패턴",
            en:"Pattern"
        },
        sub: [
            {
                title: {
                    jp:"譜面リスト",
                    ko:"패턴목록",
                    en:"Pattern List"
                },
                link: "/pattern/00/titleasc/1?hot=h"
            },
            {
                title: {
                    jp:"未プレイ譜面",
                    ko:"미 플레이 패턴",
                    en:"Patterns not played"
                },
                link: "/notplayed"
            },
            {
                title: {
                    jp:"クリアテーブル",
                    ko:"클리어 테이블",
                    en:"Clear table"
                },
                link: "/cleartable"
            },
        ]
    },
    tower: {
        title: {
            jp:"塔",
            ko:"타워",
            en:"Tower"
        },
        link: "/tower/index"
    },
    login: {
        title: {
            jp:"加入・ログイン",
            ko:"가입/로그인",
            en:"Sign in/up"
        },
        link: "/login"
    },
    logout: {
        title: {
            jp:"ログアウト",
            ko:"로그아웃",
            en:"Sign out"
        }
    },
}

export default HeaderNavData