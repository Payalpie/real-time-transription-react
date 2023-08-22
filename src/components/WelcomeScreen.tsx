import React from "react";
import { Box, Typography } from "@mui/material";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { CommonButton } from "../styledComponents/CommonStyledComponents";
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
    buttonOutline: {
        padding: '4px',
        border: '2px solid #4d2269',
        borderRadius: '50%',
        display: 'inline-block'
    },
    textLine: {
        fontSize: '15px',
        color: '#9d9696',
        fontWeight: '300'
    }
}));

const WelcomeScreen: React.FC<{ onStartTranscribing: () => void }> = ({
    onStartTranscribing,
}) => {

    const classes = useStyles()

    return (
        <Box textAlign="center" sx={{
            marginBottom: '50px'
        }} mt={10}>
            <Typography className={classes.textLine} gutterBottom>
                Press here to start
            </Typography>

            <Box sx={{
                width: '-webkit-fill-available'
            }} >
                <Typography className={classes.buttonOutline}>
                    <CommonButton onClick={onStartTranscribing}>
                        <KeyboardVoiceIcon sx={{ color: '#07053d' }} />
                    </CommonButton>
                </Typography>
            </Box>
        </Box>
    );
};

export default WelcomeScreen;
