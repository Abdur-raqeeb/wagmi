import { ReactElement, ReactNode } from 'react';
import { createClient, Provider as WagmiProvider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected'

export interface IProviderProp {
    children: ReactElement | ReactNode;
}

const client = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector()]
})

const Provider = ({ children }: IProviderProp) => {
    return (
        <WagmiProvider client={client}>
            {children}
        </WagmiProvider>
    )
}

export default Provider;