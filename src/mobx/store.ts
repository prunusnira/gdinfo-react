import storeLoginUser from './loginUser'
import storeLang from './language'
import storeIsSigned from './loginStatus'
import persistStore from './persistStore'

const language = persistStore(storeLang, ['lang'], 'language')

const loginUser = persistStore(storeLoginUser, ['user'], 'loginUser')

const loginStatus = persistStore(storeIsSigned, ['isSigned'], 'loginStatus')

const store = {
    language,
    loginUser,
    loginStatus
}

export default store;