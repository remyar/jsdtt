import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { withStoreProvider } from './providers/StoreProvider';
import { withSnackBar } from './providers/snackBar';
import { withNavigation } from './providers/navigation';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import routeMdw from './routes';

import HomePage from './pages/home';

import AppBar from './components/AppBar';
import Drawer from './components/Drawer';


const routes = [
    { path: routeMdw.urlIndex(), name: 'HomePage', Component: <HomePage /> },
];

function App(props) {

    const intl = props.intl;

    const [drawerState, setDrawerState] = useState(false);

    useEffect(() => {
    }, []);

    return <Box >
        <AppBar onClick={() => { setDrawerState(true) }} />
        <Box sx={{ paddingTop: '64px' }} >
            <Container maxWidth="xl" sx={{ paddingTop: "25px" }} >
                <Drawer
                    open={drawerState}
                    onClose={() => { setDrawerState(false) }}
                />
                <Routes >
                    {routes.map(({ path, Component }) => (
                        <Route path={path} key={path} element={Component} />
                    ))}
                </Routes>
            </Container>
        </Box>
    </Box>
}

export default withNavigation(withStoreProvider(withSnackBar(injectIntl(App))));