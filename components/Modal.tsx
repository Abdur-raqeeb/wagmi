import { Modal, Typography, Box, Button, Stack } from '@mui/material';

export interface ISignModalProp {
    open: boolean;
    onClose: () => void;
    address: any;
    data: any;
}

const SignModal = ({ address, data, onClose, open }: ISignModalProp) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={style}>
                    <Stack
                        justifyContent='center'
                        alignItems='center'
                        direction='column'
                        spacing={2}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <b>Address:</b> {address}
                        </Typography>
                        <Typography id="modal-modal-description" variant="h6" component="h2" sx={{ mt: 2, width: '100%' }}>
                            <b>Signature:</b> {data}
                        </Typography>
                        <Button onClick={onClose} variant="contained" size="large">
                            Close
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}

export default SignModal;