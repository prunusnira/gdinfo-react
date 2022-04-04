const HeaderNavData = {
    title: {
        url: "/index",
    },
    mydata: {
        text: "내 데이터",
        sub: [
            {
                title: "프로필",
                link: "/profile",
            },
            {
                title: "GF스킬",
                link: "/myskill/gf",
            },
            {
                title: "DM스킬",
                link: "/myskill/dm",
            },
            {
                title: "플레이 횟수",
                link: "/mybest",
            },
            {
                title: "스킬표 보관함",
                link: "/snapshot",
            },
        ],
    },
    skill: {
        text: "스킬",
        sub: [
            {
                title: "최근 갱신 유저",
                link: "/recent",
            },
            {
                title: "스킬랭킹",
                link: "/rank/gf/1",
            },
            {
                title: "스킬 이론치",
                link: "/exc/gf",
            },
            {
                title: "플레이 카운트 랭킹",
                link: "/cntrank/1",
            },
        ],
    },
    pattern: {
        text: "패턴",
        sub: [
            {
                title: "패턴목록",
                link: "/pattern/00/titleasc/1?hot=h",
            },
            {
                title: "미 플레이 패턴",
                link: "/notplayed",
            },
            {
                title: "클리어 테이블",
                link: "/cleartable",
            },
        ],
    },
    tower: {
        title: "타워",
        link: "/tower/index",
    },
    login: {
        title: "가입/로그인",
        link: "/login",
    },
    logout: {
        title: "로그아웃",
    },
    test: "현재 서버 점검이 진행중입니다. 부분적으로 서버가 불안해질 수 있습니다",
};

export default HeaderNavData;
