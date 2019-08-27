import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GDInfoApp from './GDInfoApp';

const GDRoot = () => (
    <BrowserRouter>
        <GDInfoApp/>
    </BrowserRouter>
);

export default GDRoot;