import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export default function CustomAlert({ openSnackBar = false, }) {
  const [open, setOpen] = React.useState(openSnackBar);

  React.useEffect(() => {
    setOpen(openSnackBar);
  }, [openSnackBar]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    if (openSnackBar) {
      openSnackBar(false);
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={SlideTransition}
    >

      <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      


      {/* <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        This is a Error Alert inside a Snackbar!
      </Alert> */}




    </Snackbar>
  );
}

function SlideTransition(props) {
  return <Slide {...props} direction="left" />; // Sliding from right to left
}