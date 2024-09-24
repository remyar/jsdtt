import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withNavigation } from '../../providers/navigation';
import { withStoreProvider } from '../../providers/StoreProvider';
import { withSnackBar } from '../../providers/snackBar';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import actions from '../../actions';


function HomePage(props) {
    const intl = props.intl;

    async function _findDevice() {
        try {
            await props.dispatch(actions.ecu.init());
            let result = (await props.dispatch(actions.device.find())).DeviceFind;
            if ( result == true){
                props.snackbar.success(intl.formatMessage({ id: "device.find.success" }));
            } else {
                props.snackbar.error(intl.formatMessage({ id: "device.find.error" }));
            }
        } catch (err) {
            props.snackbar.error(intl.formatMessage({ id: "device.find.error" }));
        }
    }
    useEffect(() => {
        _findDevice();

    }, []);

    return <Box>

        <Box sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: "80%",
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
        }}>

            dsfsdfdsfdsf
        </Box>
    </Box >

}

export default withStoreProvider(withSnackBar(withNavigation(injectIntl(HomePage))));