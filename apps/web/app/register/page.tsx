'use client';

import React, { useState } from 'react';
import { Container, Paper, Typography, Button, ToggleButton, ToggleButtonGroup, Box, TextField, Alert } from '@mui/material';
import { useAuth, type UserRole } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('passenger');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password, role, vehicleNumber || undefined);
      router.push('/');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Register for GoTicket</Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <Box sx={{ mb: 3 }}>
          <ToggleButtonGroup value={role} exclusive onChange={(_, newRole) => newRole && setRole(newRole)} aria-label="user role">
            <ToggleButton value="passenger">Passenger</ToggleButton>
            <ToggleButton value="driver">Driver</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
          <TextField label="Full Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {role === 'driver' && (
            <TextField label="Vehicle Number" fullWidth margin="normal" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>Register</Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'inherit' }}>Login here</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
