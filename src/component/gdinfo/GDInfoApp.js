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
import RivalList from './Pages/Profiles/rival/list';
import PlayCount from './Pages/Profiles/playcount/playcount';
import Error404 from './Pages/error/404';
import Error500 from './Pages/error/500';

function GDInfoApp() {
    return (
        <div>
            <GDHeader />
            <Route exact path="/" component={Recent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/index" component={Recent} />
            <Route exact path="/about0p" component={About0PC} />
            <Route exact path="/about0m" component={About0MO} />
            <Route exact path="/about1" component={About1} />
            <Route exact path="/about2" component={About2} />
            <Switch>
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/profile" component={Profile} />
            </Switch>
            <Route exact path="/mybest/:id" component={PlayCount} />
            <Route exact path="/rivallist" component={RivalList} />
            <Route exact path="/error/404" component={Error404} />
            <Route exact path="/error/500" component={Error500} />
            <GDFooter />
        </div>
    );
}

export default GDInfoApp;