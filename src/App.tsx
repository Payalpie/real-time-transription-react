import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import TranscribingScreen from "./components/TranscribingScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  container: {
    height: '75vh',
    maxWidth: '370px !important',
    backgroundColor: '#07053d',
    padding: 0,
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'center',
    WebkitJustifyContent: 'space-between !important',
  },
  text: {
    marginTop: '55px !important',
    fontSize: '18px',
    fontWeight: 300,
    padding: '15px',
  },
}));

const App: React.FC = () => {

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState<string>("");

  const classes = useStyles()

  const handleStartTranscribing = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setIsTranscribing(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const handleStopTranscribing = () => {
    setIsTranscribing(false);
    setTranscript("");
  };


  return (
    <Container className={classes.container} maxWidth="sm" >
      <Typography className={classes.text} sx={{
        color: transcript ? '#fffafa' : '#61646d',
      }} gutterBottom>
        {transcript ? transcript : "Transcript of voice will show here..."}
      </Typography>

      {isTranscribing ? (
        <TranscribingScreen
          setTranscript={setTranscript}
          onStopTranscribing={handleStopTranscribing}
        />
      ) : (
        <WelcomeScreen onStartTranscribing={handleStartTranscribing} />
      )}
    </Container>
  );
};

export default App;
