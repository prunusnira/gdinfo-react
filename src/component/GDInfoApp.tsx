import React, { useEffect, useState } from 'react';
import GDHeader from './gdinfo/Header/header';
import GDFooter from './gdinfo/Footer/footer';
import {Route, Switch} from 'react-router-dom';
import store from '../mobx/store';

import {Center, OuterBox} from '../styled/styledOverall'

import IndexPage from './gdinfo/Pages/index/index';
import Recent from './gdinfo/Pages/recent/recent';
import Login from './gdinfo/Pages/login/login';
import LoginFromApp from './gdinfo/Pages/login/loginFromApp';
import SearchResult from './gdinfo/Pages/search/search';
import Terms from './gdinfo/Pages/terms/terms';
import NewUser from './gdinfo/Pages/User/newuser/newuser';

import Profile from './gdinfo/Pages/Profiles/profile/profile';
import ProfileLoginCheck from './gdinfo/Pages/Profiles/profile/checkLogin';
import PlayCount from './gdinfo/Pages/Profiles/playcount/playcount';
import PlayCountLoginCheck from './gdinfo/Pages/Profiles/playcount/checkLogin';
import SnapshotList from './gdinfo/Pages/Profiles/snapshot/list';
import SnapshotLoginCheck from './gdinfo/Pages/Profiles/snapshot/checkLogin';
import ProfileReset from './gdinfo/Pages/Profiles/reset/reset';
import TowerClearStat from './gdinfo/Pages/Profiles/towerClearStat/towerClearStat';

import MySkill from './gdinfo/Pages/Skill/myskill/myskill';
import SkillContainer from './gdinfo/Pages/Skill/skill/skill';
import SkillRanking from './gdinfo/Pages/Skill/ranking/skillranking';
import PlaycountRanking from './gdinfo/Pages/Skill/playcntrank/playcntrank';
import SkillSnapshot from './gdinfo/Pages/Skill/skill/skillSnapshot';
import EXC from './gdinfo/Pages/Skill/skill/exc';

import PatternList from './gdinfo/Pages/Pattern/pattern/pattern';
import PatternRank from './gdinfo/Pages/Pattern/patternRank/patternRank';
import NoRecordMusicList from './gdinfo/Pages/Pattern/noRecordMusic/noRecordMusicList';
import NotPlayedLoginCheck from './gdinfo/Pages/Pattern/noRecordMusic/npLoginChk';
import Music from './gdinfo/Pages/Pattern/music/music';
import ClearTable from './gdinfo/Pages/Pattern/cleartable/cleartable';
import CTLoginChk from './gdinfo/Pages/Pattern/cleartable/checkLogin';

import TowerList from './gdinfo/Pages/Tower/towerList/towerlist';
import TowerStat from './gdinfo/Pages/Tower/towerStat/towerstat';
import TowerHowto from './gdinfo/Pages/Tower/towerHowto/towerHowto';

import Error404 from './gdinfo/Pages/error/404';
import Error500 from './gdinfo/Pages/error/500';
import LData from './gdinfo/Pages/Common/language';
import { observer } from 'mobx-react';
import { isSynchronized } from 'mobx-persist-store';

/**
 * header/footer를 제외하고는 react-router-dom으로 구성함
 */
const GDInfoApp = observer(() => {
    const {language, loginUser, loginStatus} = store

    if(!isSynchronized(store.language)) {
        return null
    }
    else {
        if(language.lang === '') {
            language.setLang(LData.setLang())
        }
    }

    return (
        <OuterBox>
            <GDHeader />
            <Center>
                <Route exact path="/" component={IndexPage} />
                <Route path="/index" component={IndexPage} />
                <Route path="/recent" component={Recent} />
                <Route path="/login" component={Login} />
                <Route exact path="/app/login"  component={Recent} />
                <Route path="/app/login/:uid" component={LoginFromApp} />
                <Route path="/search/:type/:value/:page" component={SearchResult} />
                <Route path="/precautions" component={Terms} />
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
                <Route path="/pattern/:ver/:order/:page" component={PatternList} />
                <Route path="/ptrank/:mid/:ptcode/:page" component={PatternRank} />
                <Switch>
                    <Route path="/notplayed/:gtype/:userid/:vertype/:page" component={NoRecordMusicList} />
                    <Route path="/notplayed" component={NotPlayedLoginCheck} />
                </Switch>
                <Route path="/music/:mid/:userid" component={Music} />
                <Switch>
                    <Route path="/cleartable/:userid" component={ClearTable} />
                    <Route path="/cleartable/" component={CTLoginChk} />
                </Switch>
                {/* Tower */}
{/*                <Route path="/tower/index" component={TowerList} />
                <Route path="/tower/stat/:tower" component={TowerStat} />
                <Route path="/tower/howto" component={TowerHowto} />
                {/* Error */}
{/*                <Route path="/error/404" component={Error404} />
                <Route path="/error/500" component={Error500} />*/}
            </Center>
            <GDFooter />
        </OuterBox>
    );
})

export default GDInfoApp;