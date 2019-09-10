import React from 'react';
import GDHeader from './Header/header';
import GDFooter from './Footer/footer';
import {Route, Switch} from 'react-router-dom';

import Recent from './Pages/recent/Recent';
import Login from './Pages/login/Login';

import About0PC from './Pages/about/About0PC';
import About0MO from './Pages/about/About0MO';
import About1 from './Pages/about/About1';
import About2 from './Pages/about/About2';

import Profile from './Pages/Profiles/profile/Profile';
import ProfileLoginCheck from './Pages/Profiles/profile/checkLogin';
import RivalList from './Pages/Profiles/rival/list';
import PlayCount from './Pages/Profiles/playcount/playcount';
import SnapshotList from './Pages/Profiles/snapshot/list';
import SnapshotLoginCheck from './Pages/Profiles/snapshot/checkLogin';

import SkillNR from './Pages/Skill/skill/skillnr';
import SkillRanking from './Pages/Skill/ranking/ranking';
import PlaycountRanking from './Pages/Skill/countrank/cntrank';

import PatternList from './Pages/Pattern/pattern/pattern';
import PatternRank from './Pages/Pattern/patternRank/patternRank';
import NotPlayed from './Pages/Pattern/notplayed/notplayed';
import NotPlayedLoginCheck from './Pages/Pattern/notplayed/npLoginChk';
import Music from './Pages/Pattern/music/music';
import ClearTable from './Pages/Pattern/cleartable/cleartable';
import CTLoginChk from './Pages/Pattern/cleartable/checkLogin';

import TowerList from './Pages/Tower/towerList/towerlist';
import TowerStat from './Pages/Tower/towerStat/towerstat';

import Error404 from './Pages/error/404';
import Error500 from './Pages/error/500';

function GDInfoApp() {
    return (
        <div>
            <GDHeader />
            <Route exact path="/" component={Recent} />
            <Route path="/login" component={Login} />
            <Route path="/index" component={Recent} />
            {/* About */}
            <Route path="/about0p" component={About0PC} />
            <Route path="/about0m" component={About0MO} />
            <Route path="/about1" component={About1} />
            <Route path="/about2" component={About2} />
            {/* Profile */}
            <Switch>
                <Route path="/profile/:id" component={Profile} />
                <Route path="/profile" component={ProfileLoginCheck} />
            </Switch>
            <Route path="/mybest/:id" component={PlayCount} />
            <Route path="/rivallist" component={RivalList} />
            <Route path="/snapshot" component={SnapshotLoginCheck} />
            <Route path="/skill/snapshot/list/:id" component={SnapshotList} />
            {/* Skill */}
            <Route path="/skill/:ptype/:userid/:gtype/:page/:order" component={SkillNR} />
            <Route path="/rank/:gtype/:page" component={SkillRanking} />
            <Route path="/cntrank/:page" component={PlaycountRanking} />
            <Route path="/exc/gf" component={SkillNR} />
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
            {/* Error */}
            <Route path="/error/404" component={Error404} />
            <Route path="/error/500" component={Error500} />
            <GDFooter />
        </div>
    );
}

export default GDInfoApp;