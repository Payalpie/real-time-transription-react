import { Box, Typography } from "@mui/material";
import React, { useEffect, Dispatch, SetStateAction } from "react";
import { CommonButton } from "../styledComponents/CommonStyledComponents";
import StopIcon from '@mui/icons-material/Stop';
import { makeStyles } from "@mui/styles";

interface TranscribingScreenProps {
    onStopTranscribing: () => void;
    setTranscript: Dispatch<SetStateAction<string>>;
}

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

const TranscribingScreen: React.FC<TranscribingScreenProps> = ({
    onStopTranscribing,
    setTranscript,
}) => {

    const classes = useStyles()

    useEffect(() => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const currentTranscript =
                event.results[event.results.length - 1][0].transcript;

            setTranscript(prev => prev + currentTranscript);
        };

        recognition.start();

        return () => {
            recognition.stop();
        };
    }, []);

    return (
        <Box textAlign="center" sx={{
            marginBottom: '50px'
        }} mt={10}>
            <Typography className={classes.textLine} gutterBottom>
                Press here to stop
            </Typography>
            <Box sx={{
                width: '-webkit-fill-available'
            }} >
                <Typography className={classes.buttonOutline}>
                    <CommonButton onClick={onStopTranscribing}>
                        <StopIcon sx={{ color: '#07053d' }} />
                    </CommonButton>
                </Typography>
            </Box>
        </Box>
    );
};

export default TranscribingScreen;
