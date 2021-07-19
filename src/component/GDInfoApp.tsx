import React, { useEffect } from 'react'
import SinHeader from './header/sinHeader'
import SinFooter from './footer/sinFooter'
import {Route, Switch} from 'react-router-dom'
import store from '../mobx/store'
import { observer } from 'mobx-react'

import {Center, OuterBox} from '../styled/styledOverall'

import IndexPage from './index/index'
import Recent from './recent/recent'
import Login from './user/login/login'
import LoginFromApp from './user/login/loginFromApp'
import SearchResult from './search/search'
import NewUser from './user/newuser/newuser'

import Profile from './user/profile/profile'
import ProfileLoginCheck from './user/profile/checkLogin'
import PlayCount from './user/playcount/playcount'
import PlayCountLoginCheck from './user/playcount/checkLogin'
import SnapshotList from './user/snapshot/snapshotList'
import SnapshotLoginCheck from './user/snapshot/checkLogin'
import ProfileReset from './user/reset/reset'
import TowerClearStat from './tower/towerClearStat/towerClearStat'

import MySkill from './skill/myskill'
import SkillContainer from './skill/skill/skill'
import SkillRanking from './skill/ranking/skillranking'
import PlaycountRanking from './skill/playcntrank/playcntrank'
import SkillSnapshot from './skill/skill/skillSnapshot'
import EXC from './skill/skill/exc'

import PTList from './pattern/patternList/ptList'
import PatternRank from './pattern/patternRank/patternRank'
import NoRecordMusicList from './pattern/noRecordMusic/noRecordList'
import NotPlayedLoginCheck from './pattern/noRecordMusic/npLoginChk'
import Music from './pattern/music/music'
import ClearTable from './pattern/cleartable/clearTable'
import ClearTableLoginChk from './pattern/cleartable/checkLogin'

import TowerList from './tower/towerList/towerlist'
import TowerStat from './tower/towerStat/towerStat'
import TowerHowto from './tower/towerHowto/towerHowto'

import Error404 from './error/404'
import Error500 from './error/500'
import LData from './common/language'
import CommonData from './common/commonData'

/**
 * header/footer를 제외하고는 react-router-dom으로 구성함
 */
const GDInfoApp = observer(() => {
    const {language, version} = store

    useEffect(() => {
        if(version.version === null ||
            version.version === undefined ||
            version.version < CommonData.internalVersion) {
            localStorage.clear()
            version.setVersion(CommonData.internalVersion)
        }
    
        if(language.lang === null ||
            language.lang === undefined ||
            language.lang === '') {
            language.setLang(LData.setLang())
        }
    }, [])

    return (
        <OuterBox>
            <SinHeader />
            <Center>
                <Route exact path="/" component={IndexPage} />
                <Route path="/index" component={IndexPage} />
                <Route path="/recent" component={Recent} />
                <Route path="/login" component={Login} />
                <Route exact path="/app/login"  component={Recent} />
                <Route path="/app/login/:uid" component={LoginFromApp} />
                <Route path="/search/:type/:value/:page" component={SearchResult} />
                <Route path="/newuser" component={NewUser} />
                {/* Profile */}
                <Switch>
                    <Route path="/profile/towerstatus/:id" component={TowerClearStat} />
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="/profile" component={ProfileLoginCheck} />
                </Switch>
                <Switch>
                    <Route path="/mybest/:id" component={PlayCount} />
                    <Route path="/mybest" component={PlayCountLoginCheck} />
                </Switch>
                <Route path="/snapshot" component={SnapshotLoginCheck} />
                <Route path="/skill/snapshot/list/:id" component={SnapshotList} />
                <Route path="/reset" component={ProfileReset} />
                {/* Skill */}
                <Route path="/myskill/:gtype" component={MySkill} />
                <Route exact path="/skill/:ptype/:userid/:gtype/:page/:order" render={() => <SkillContainer share={false} />} />
                <Route path="/skillscr/:ptype/:userid/:gtype/:page/:order" render={() => <SkillContainer share={true} />} />
                <Route path="/skill/snapshot/view/:share/:id/:date/:gtype" component={SkillSnapshot} />
                <Route path="/rank/:gtype/:page" component={SkillRanking} />
                <Route path="/cntrank/:page" component={PlaycountRanking} />
                <Route path="/exc/:gtype" component={EXC} />
                {/* Pattern */}
                <Route path="/pattern/:ver/:order/:page" component={PTList} />
                <Route path="/ptrank/:mid/:ptcode/:page" component={PatternRank} />
                <Switch>
                    <Route path="/notplayed/:gtype/:userid/:vertype/:page" component={NoRecordMusicList} />
                    <Route path="/notplayed" component={NotPlayedLoginCheck} />
                </Switch>
                <Route path="/music/:mid/:userid" component={Music} />
                <Switch>
                    <Route path="/cleartable/:userid" component={ClearTable} />
                    <Route path="/cleartable/" component={ClearTableLoginChk} />
                </Switch>
                {/* Tower */}
                <Route path="/tower/index" component={TowerList} />
                <Route path="/tower/stat/:tower" component={TowerStat} />
                <Route path="/tower/howto" component={TowerHowto} />
                {/* Error */}
                <Route path="/error/404" component={Error404} />
                <Route path="/error/500" component={Error500} />
            </Center>
            <SinFooter />
        </OuterBox>
    )
})

export default GDInfoApp