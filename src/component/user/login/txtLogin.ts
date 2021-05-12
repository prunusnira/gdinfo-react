const txtLogin = {
    title: {
        "jp":"ログイン",
        "ko":"로그인",
        "en":"Sign in"
    },
    google: {
        "jp":"本サービスはGoogleアカウントからログインができます",
        "ko":"본 서비스는 구글 계정을 사용한 로그인만을 지원합니다.",
        "en":"This service only supports Google account login"
    },
    titleAppFail: {
        "jp":"ログイン失敗",
        "ko":"로그인 실패",
        "en":"Sign in failure"
    },
    contentAppFailTitle: {
        "jp":"ログインできません",
        "ko":"로그인이 실패하였습니다",
        "en":"Unknown error made login sequence fail"
    },
    contentAppFail: {
        "jp":``,
        "ko":`1. 앱 하단에서 Login 탭을 눌러 로그인하거나<br/>
            2. 아래 버튼을 눌러 비로그인 상태에서 진행해주세요<br/><br/>
            * 일반적인 상황에서는 이 페이지가 표시되지 않아야 합니다.<br/>
            * 이 페이지가 나타났다면 개발자에게 문의해주세요.`,
        "en":``
    },
    loginErrorModal: {
        title: {
            "jp":"ログインエラー",
            "ko":"로그인 실패",
            "en":"Sign-in failed"
        },
        body: {
            p1: {
                "jp":"理由が判明されないログインエラーがあります。",
                "ko":"이유를 알 수 없는 로그인 오류입니다.",
                "en":"Unknown login error has occurred"
            },
            p2: {
                "jp":"Googleからの不具合の可能性がありますので他のデバイスからログイン、またはしばらくのあとにログインしてください",
                "ko":"Google쪽에 문제가 있을 수 있으니 다른 디바이스에서 로그인하거나 잠시 후 시도해주세요",
                "en":"This error may occurred from Google. Please try from other device, or wait for a second."
            },
            p3: {
                "jp":"Incognito/InPrivateなどのモードではログインできません",
                "ko":"Incognito/InPrivate 등의 모드에서는 로그인할 수 없습니다",
                "en":"You can't sign in from private mode like Incognito/InPrivate"
            },
            msg: {
                "jp":"エラーメッセージ",
                "ko":"에러 메시지",
                "en":"Error Message"
            }
        }
        
    }
}

export default txtLogin;