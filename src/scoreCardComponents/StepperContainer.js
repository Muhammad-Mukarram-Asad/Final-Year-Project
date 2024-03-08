import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';
import HorizontalStepper from './HorizontalStepper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const StepperContainer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar style={{display:"flex", justifyContent: "space-between", alignItems:"center"}}>
        <FontAwesomeIcon
          icon={faBackwardStep}
          style={{ color: "#ffffff", marginLeft:20 }}
          onClick={() => navigate("/userProfile") }
        />
          <Typography variant='h6'>Multi Step Form</Typography>
          <div>{""}</div>
        </Toolbar>
      </AppBar>
      <Container>
        <Box marginTop={10}>
          <HorizontalStepper />
        </Box>
      </Container>
    </div>
  )
}

export default StepperContainer
