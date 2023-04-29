import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  FormControlLabel,
  Alert,
} from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';

import CustomTextField from '../../../src/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../src/components/forms/theme-elements/CustomFormLabel';
import ParentCard from '../../../src/components/shared/ParentCard';

const steps = ['Name', 'Details'];

const FormWizard = () => {
  const [activeStep, setActiveStep] = React.useState(0);
 
  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  // eslint-disable-next-line consistent-return
  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <CustomFormLabel htmlFor="Name">Name</CustomFormLabel>
            <CustomTextField id="Name" variant="outlined" fullWidth />
          </Box>
        );
      case 1:
        return (
          <Box>
            <CustomFormLabel htmlFor="Code">Code</CustomFormLabel>
            <CustomTextField id="Code" variant="outlined" fullWidth />
            <CustomFormLabel htmlFor="Lname">Unit</CustomFormLabel>
            <CustomTextField id="Unit" type="text" variant="outlined" fullWidth />
            <CustomFormLabel htmlFor="Address">Material</CustomFormLabel>
            <CustomTextField id="Material" multiline rows={4} variant="outlined" fullWidth />
          </Box>
        );
      default:
        break;
    }
  };


  return (
    <PageContainer>
      <Breadcrumb title="Form Wizard" subtitle="this is Form Wizard page" />
      <ParentCard title="Form Wizard">
        <Box width="100%">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <>
            <Box>{handleSteps(activeStep)}</Box>

            <Box display="flex" flexDirection="row" mt={3}>
              <Button
                color="inherit"
                variant="contained" 
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box flex="1 1 auto" />
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Save
              </Button>

              <Button
                onClick={handleNext}
                variant="contained"
                color={activeStep === steps.length - 1 ? 'success' : 'secondary'}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default FormWizard;
