import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
    Dialog,
    DialogContent,
    Typography,
    Box,
    Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';


interface SuccessProps {
    open: boolean;
    onClose: () => void;
    customerEmail: string;
}

const fireConfetti = () => {
    const duration = 1 * 500;
    const end = Date.now() + duration;

    const frame = () => {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#1976d2', '#66bb6a', '#ffca28'],
            zIndex: 1400, // above MUI's Dialog (1300)
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#1976d2', '#66bb6a', '#ffca28'],
            zIndex: 1400, // above MUI's Dialog (1300)
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    };

    frame();

};

const SuccessPage:React.FC<SuccessProps> = ({ open, onClose, customerEmail }) => {
    useEffect(() => {
        if (open) {
            fireConfetti();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogContent sx={{ textAlign: 'center', py: 5 }}>
                <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />

                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Congrats! 🎉
                </Typography>

                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                    We appreciate your business! A confirmation email will be sent to{' '}
                    <strong>{customerEmail}</strong>, and we'll be in contact with you shortly.
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Questions? Email us at{' '}
                    <a href="mailto:sunpengyimin@gmail.com">sunpengyimin@gmail.com</a>.
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" onClick={onClose} component={Link} to="/about">
                        Done
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};


export default SuccessPage;