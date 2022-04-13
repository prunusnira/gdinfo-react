import storeLoginUser from "./loginUser";
import storeLang from "./language";
import storeIsSigned from "./loginStatus";
import storeVersion from "./version";
import storeDark from "./darkmode";
import persistStore from "./persistStore";
import persistStoreNoneEnc from "./persistStoreNoneEnc";

const language = persistStoreNoneEnc(storeLang, ["lang"], "language");

const loginUser = persistStore(storeLoginUser, ["user"], "loginUser");

const loginStatus = persistStore(storeIsSigned, ["isSigned"], "loginStatus");

const version = persistStoreNoneEnc(storeVersion, ["version"], "version");

const dark = persistStore(storeDark, ["dark"], "dark");

const store = {
    language,
    loginUser,
    loginStatus,
    version,
    dark,
};

export default store;
