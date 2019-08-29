import React from 'react';
import GDHeader from './Header/header';
import GDFooter from './Footer/footer';
import {Route, Switch} from 'react-router-dom';

import Recent from './Pages/recent/Recent';
import About0PC from './Pages/about/About0PC';
import About0MO from './Pages/about/About0MO';
import About1 from './Pages/about/About1';
import About2 from './Pages/about/About2';
import Profile from './Pages/user/Profile';

function GDInfoApp() {
    return (
        <div>
            <GDHeader />
            <Route exact path="/" component={Recent} />
            <Route exact path="/index" component={Recent} />
            <Route exact path="/about0p" component={About0PC} />
            <Route exact path="/about0m" component={About0MO} />
            <Route exact path="/about1" component={About1} />
            <Route exact path="/about2" component={About2} />
            <Switch>
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/profile" component={Profile} />
            </Switch>
            <GDFooter />
        </div>
    );
}

export default GDInfoApp;