import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        p: 2,
        mt: 'auto',
        backgroundColor: '#f1f1f1',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; 2024 Talha. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
