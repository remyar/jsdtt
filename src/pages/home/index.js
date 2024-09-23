import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withNavigation } from '../../providers/navigation';
import { withStoreProvider } from '../../providers/StoreProvider';
import { withSnackBar } from '../../providers/snackBar';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import actions from '../../actions';


function HomePage(props) {

    useEffect(()=>{
        props.dispatch(actions.serial.find());
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