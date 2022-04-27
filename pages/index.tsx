import { useState } from 'react';
import type { NextPage } from 'next'
import {  Stack } from '@mui/material';
import Top from '../components/Top';
import Bottom from '../components/Bottom';

const Home: NextPage = () => {
    const [showSign, setShowSign] = useState(false);
    return (
        <Stack
            justifyContent='space-between'
            alignItems='center'
            direction='column'
            sx={{
                width: '100%',
                height: '100%',
                padding: '60px 2px'
            }}
            spacing={2}
        >
            <Top setShowSign={setShowSign} />
            {showSign && <Bottom/>}
        </Stack>
    )
}

export default Home
