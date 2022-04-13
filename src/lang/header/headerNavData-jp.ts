const HeaderNavData = {
    title: {
        url: "/index",
    },
    mydata: {
        text: "マイデータ",
        sub: [
            {
                title: "プロフィール",
                link: "/profile",
            },
            {
                title: "GFスキル",
                link: "/myskill/gf",
            },
            {
                title: "DMスキル",
                link: "/myskill/dm",
            },
            {
                title: "プレイ数",
                link: "/mybest",
            },
            {
                title: "スキル表保管箱",
                link: "/snapshot",
            },
        ],
    },
    skill: {
        text: "スキル",
        sub: [
            {
                title: "最近の更新リスト",
                link: "/recent",
            },
            {
                title: "ランキング",
                link: "/rank/gf/1",
            },
            {
                title: "スキル理論値",
                link: "/exc/gf",
            },
            {
                title: "プレイカウントランキング",
                link: "/cntrank/1",
            },
        ],
    },
    pattern: {
        text: "譜面",
        sub: [
            {
                title: "譜面リスト",
                link: "/pattern/00/titleasc/1?hot=h",
            },
            {
                title: "未プレイ譜面",
                link: "/notplayed",
            },
            {
                title: "クリアテーブル",
                link: "/cleartable",
            },
        ],
    },
    tower: {
        title: "タワー",
        link: "/tower/index",
    },
    login: {
        title: "加入・ログイン",
        link: "/login",
    },
    logout: {
        title: "ログアウト",
    },
    test: "現在、メンテナンスを行っております。時々不安定になる可能性があります。",
};

export default HeaderNavData;
