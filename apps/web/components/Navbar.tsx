'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useThemeMode } from '@/context/ThemeContext';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useThemeMode();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ backdropFilter: 'blur(8px)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <DirectionsBusIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              fontFamily: 'Poppins',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'primary.main',
              flexGrow: 1,
              cursor: 'pointer',
            }}
            onClick={() => router.push('/')}
          >
            GoTicket
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {!user ? (
              <>
                <Button color="primary" onClick={() => router.push('/login')}>Login</Button>
                <Button variant="contained" color="primary" onClick={() => router.push('/register')}>Register</Button>
              </>
            ) : (
              <>
                {user.role === 'passenger' && (
                  <>
                    <Button color="primary" onClick={() => router.push('/passenger/dashboard')}>Dashboard</Button>
                    <Button color="primary" onClick={() => router.push('/passenger/book')}>Book</Button>
                    <Button color="primary" onClick={() => router.push('/passenger/tickets')}>My Tickets</Button>
                    <Button color="primary" onClick={() => router.push('/passenger/profile')}>Profile</Button>
                  </>
                )}
                {user.role === 'driver' && (
                  <>
                    <Button color="primary" onClick={() => router.push('/driver/dashboard')}>Dashboard</Button>
                    <Button color="primary" onClick={() => router.push('/driver/scan')}>Scan Ticket</Button>
                  </>
                )}
                <Button color="error" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
