import storeLoginUser from './loginUser'
import storeLang from './language'
import storeIsSigned from './loginStatus'
import storeVersion from './version'
import persistStore from './persistStore'
import persistStoreNoneEnc from './persistStoreNoneEnc'

const language = persistStoreNoneEnc(storeLang, ['lang'], 'language')

const loginUser = persistStore(storeLoginUser, ['user'], 'loginUser')

const loginStatus = persistStore(storeIsSigned, ['isSigned'], 'loginStatus')

const version = persistStoreNoneEnc(storeVersion, ['version'], 'version')

const store = {
    language,
    loginUser,
    loginStatus,
    version
}

export default store;