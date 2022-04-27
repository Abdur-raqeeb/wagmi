import { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useConnect, useAccount, useEnsAvatar, useEnsName, useDisconnect } from 'wagmi';
import Image from 'next/image';

export interface ITopProps {
    setShowSign: (value: boolean) => void;
}

const Top = ({ setShowSign }: ITopProps) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const { data: account } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({addressOrName: account?.address})
    const { data: ensName } = useEnsName({address: account?.address})
    const { connect, connectors, error, isConnecting, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect() as any

    const [defaultConnectors, setDefaultConnectors] = useState<any[]>([])

    useEffect(() => {
        if (account) {
            setShowSign(true)
        } else {
            setShowSign(false)
        }
    }, [account])

    return (
        isClient ? <Stack sx={{width: '100%', height: '30%'}}>
            <Stack
                justifyContent='space-between'
                alignItems='center'
                direction='column'
                spacing={3}
            >
                {account ? (
                    <>
                        {/*<Image src={ensAvatar} alt="ENS Avatar" />*/}
                        <Typography variant="h4" component="h5">
                            Your account address:
                        </Typography>
                        <Typography variant="h6" component="h6" color="text.secondary">
                            {ensName ? `${ensName} (${account.address})` : account.address}
                        </Typography>
                        <Typography variant="h6" component="h6" color="text.secondary">
                            Connected to {account?.connector?.name}
                        </Typography>
                        <Typography variant="h6" component="h6" color="text.secondary">
                            You can sign a message below
                        </Typography>
                        <Button variant="contained" size="large" onClick={disconnect}>Disconnect</Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h4" component="h5">
                            Welcome
                        </Typography>
                        <Typography variant="h6" component="h6" color="text.secondary">
                            Please connect your account using the button below
                        </Typography>
                        <div>
                            {connectors.map((connector) => (
                                <Button
                                    disabled={!connector.ready}
                                    key={connector.id}
                                    variant="outlined" size="large"
                                    onClick={() => connect(connector)}
                                >
                                    {connector.name}
                                    {!connector.ready && ' (unsupported)'}
                                    {isConnecting &&
                                        connector.id === pendingConnector?.id &&
                                        ' (connecting)'}
                                </Button>

                            ))}
                            {error && <p>{error.message}</p>}
                        </div>
                    </>
                )
                }

            </Stack>

        </Stack> : <h1>Loading.....</h1>
    )
}

export default Top;