import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Rocket } from '@mui/icons-material';
import MUIProvider from './MUIProvider';

export default function Welcome() {
  return (
    <MUIProvider>
      <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 6,
            borderRadius: 2,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Rocket sx={{ fontSize: 64, color: 'primary.main' }} />
          </Box>
          
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to DOMES V2
          </Typography>
          
          <Typography variant="h6" color="text.secondary" paragraph>
            Your project is set up with:
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
            <Button variant="contained" color="primary">AstroJS</Button>
            <Button variant="contained" color="secondary">React</Button>
            <Button variant="contained" sx={{ bgcolor: '#646CFF' }}>Vite</Button>
            <Button variant="contained" sx={{ bgcolor: '#007FFF' }}>Material UI</Button>
          </Box>
          
          <Typography variant="body1" color="text.secondary">
            Start building your amazing application! 🚀
          </Typography>
        </Paper>
      </Box>
    </Container>
    </MUIProvider>
  );
}