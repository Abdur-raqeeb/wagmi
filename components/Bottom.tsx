import { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useSignMessage } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'

import SignModal from './Modal';

const Bottom = () => {
    const [text, setText] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const onChange = (e: any) => setText(e.target.value);

    const [recoveredAddress, setRecoveredAddress] = useState<string>()
    const { data, error, isLoading, signMessage } = useSignMessage({
        onSuccess(data, variables) {
            // Verify signature when sign message succeeds
            const address = verifyMessage(variables.message, data)
            setRecoveredAddress(address)
        },
    })

    const onSubmit = () => signMessage({ message: text })

    const onClose = () => setIsModalOpen(false)

    useEffect(() => {
        if (data) {
            setIsModalOpen(true)
        }
    }, [data])

    return (
        <Box sx={{width: '100%', height: '70%'}}>
            <Stack
                justifyContent='space-evenly'
                alignItems='center'
                direction='column'
                sx={{
                    width: '100%',
                    height: '100%',
                    marginTop: '40px'
                }}
            >
                <Typography variant="h5" component="div">
                    Sign Message
                </Typography>
                <div style={{ width: '80%', height: '80%' }}>
                    <Stack
                        justifyContent='center'
                        alignItems='center'
                        direction='column'
                        spacing={3}
                    >
                        <>
                            <TextField
                                fullWidth
                                multiline
                                label="Message"
                                InputProps={{
                                    rows: 8
                                }}
                                placeholder='Enter message'
                                sx={{
                                    height: '80%'
                                }}
                                value={text}
                                onChange={onChange}
                            />
                            <Button onClick={onSubmit} disabled={text.length < 3 || isLoading} variant="contained" size="large">
                                {isLoading ? 'Check Wallet' : 'Sign Message'}
                            </Button>
                            {error && <div>{error.message}</div>}
                        </>
                    </Stack>
                    <SignModal open={isModalOpen} onClose={onClose} address={recoveredAddress} data={data} />
                </div>
            </Stack>
        </Box>
    )
};

export default Bottom;