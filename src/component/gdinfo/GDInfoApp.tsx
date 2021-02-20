import React from 'react';
import GDHeader from './Header/header';
import GDFooter from './Footer/footer';
import {Route, Switch} from 'react-router-dom';

import IndexPage from './Pages/index/index';
import Recent from './Pages/recent/recent';
import Login from './Pages/login/login';
import LoginFromApp from './Pages/login/loginFromApp';
import SearchResult from './Pages/search/search';
import Terms from './Pages/terms/terms';
import NewUser from './Pages/User/newuser/newuser';

import Profile from './Pages/Profiles/profile/profile';
import ProfileLoginCheck from './Pages/Profiles/profile/checkLogin';
import PlayCount from './Pages/Profiles/playcount/playcount';
import PlayCountLoginCheck from './Pages/Profiles/playcount/checkLogin';
import SnapshotList from './Pages/Profiles/snapshot/list';
import SnapshotLoginCheck from './Pages/Profiles/snapshot/checkLogin';
import ProfileReset from './Pages/Profiles/reset/reset';
import TowerClearStat from './Pages/Profiles/towerClearStat/towerClearStat';

import MySkill from './Pages/Skill/myskill/myskill';
import SkillNR from './Pages/Skill/skill/skillnr';
import SkillSH from './Pages/Skill/skill/skillsh';
import SkillRanking from './Pages/Skill/ranking/ranking';
import PlaycountRanking from './Pages/Skill/countrank/cntrank';
import SkillSnapshotNR from './Pages/Skill/skill/skillSnapshotNR';
import SkillSnapshotSH from './Pages/Skill/skill/skillSnapshotSH';
import EXC from './Pages/Skill/skill/exc';

import PatternList from './Pages/Pattern/pattern/pattern';
import PatternRank from './Pages/Pattern/patternRank/patternRank';
import NotPlayed from './Pages/Pattern/notplayed/notplayed';
import NotPlayedLoginCheck from './Pages/Pattern/notplayed/npLoginChk';
import Music from './Pages/Pattern/music/music';
import ClearTable from './Pages/Pattern/cleartable/cleartable';
import CTLoginChk from './Pages/Pattern/cleartable/checkLogin';

import TowerList from './Pages/Tower/towerList/towerlist';
import TowerStat from './Pages/Tower/towerStat/towerstat';
import TowerHowto from './Pages/Tower/towerHowto/towerHowto';

import Error404 from './Pages/error/404';
import Error500 from './Pages/error/500';

function GDInfoApp() {
    return (
        <div>
            <GDHeader />
            <Route exact path="/" component={IndexPage} />
            <Route path="/recent" component={Recent} />
            <Route path="/login" component={Login} />
            <Route exact path="/app/login"  component={Recent} />
            <Route path="/app/login/:uid" component={LoginFromApp} />
            <Route path="/index" component={IndexPage} />
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
            <Route exact path="/skill/:ptype/:userid/:gtype/:page/:order" component={SkillNR} />
            <Route path="/skill/snapshot/view/nr/:id/:date/:gtype" component={SkillSnapshotNR} />
            <Route path="/skill/snapshot/view/sh/:id/:date/:gtype" component={SkillSnapshotSH} />
            <Route path="/skillscr/:ptype/:userid/:gtype/:page/:order" component={SkillSH} />
            <Route path="/rank/:gtype/:page" component={SkillRanking} />
            <Route path="/cntrank/:page" component={PlaycountRanking} />
            <Route path="/exc/:gtype" component={EXC} />
            {/* Pattern */}
            <Route path="/pattern/:ver/:order/:page" component={PatternList} />
            <Route path="/ptrank/:mid/:ptcode/:page" component={PatternRank} />
            <Switch>
                <Route path="/notplayed/:gtype/:userid/:vertype/:page" component={NotPlayed} />
                <Route path="/notplayed" component={NotPlayedLoginCheck} />
            </Switch>
            <Route path="/music/:mid/:userid" component={Music} />
            <Switch>
                <Route path="/cleartable/:userid" component={ClearTable} />
                <Route path="/cleartable/" component={CTLoginChk} />
            </Switch>
            {/* Tower */}
            <Route path="/tower/index" component={TowerList} />
            <Route path="/tower/stat/:tower" component={TowerStat} />
            <Route path="/tower/howto" component={TowerHowto} />
            {/* Error */}
            <Route path="/error/404" component={Error404} />
            <Route path="/error/500" component={Error500} />
            <GDFooter />
        </div>
    );
}

export default GDInfoApp;