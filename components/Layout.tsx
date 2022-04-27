import { ReactNode, ReactElement } from 'react';
import { Container, Box, Grid } from '@mui/material';

export interface ILayoutProp {
    children: ReactNode | ReactElement
}

const Layout = ({ children }: ILayoutProp) => {
    return (
        <>
            <Container fixed sx={{
                bgcolor: '#D5D5D5',
                position: 'relative',
            }}>
                <Grid
                    container
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    sx={{
                        height: '100vh',
                        width: '100%',
                    }}
                >
                    <Grid item>
                        <Box sx={{
                            bgcolor: '#fff',
                            height: '90vh',
                            width: '40vw'
                        }}>
                            <div style={{ height: '100%', position: 'relative' }}>
                                {children}
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Layout;