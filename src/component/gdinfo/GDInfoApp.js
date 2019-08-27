import React from 'react';
import GDHeader from './Header/header';
import GDFooter from './Footer/footer';
import {Route} from 'react-router-dom';

import Recent from './Pages/recent/Recent';
import About0 from './Pages/about/About0';
import About1 from './Pages/about/About1';
import About2 from './Pages/about/About2';

function GDInfoApp() {
    return (
        <div>
            <GDHeader />
            <Route exact path="/" component={Recent} />
            <Route exact path="/index" component={Recent} />
            <Route exact path="/about0" component={About0} />
            <Route exact path="/about1" component={About1} />
            <Route exact path="/about2" component={About2} />
            <GDFooter />
        </div>
    );
}

export default GDInfoApp;