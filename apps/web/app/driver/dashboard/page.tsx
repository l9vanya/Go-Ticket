'use client';

import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function DriverDashboard() {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Driver Dashboard</Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Today&apos;s Earnings</Typography>
            <Typography variant="h3">₹1,250</Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Monthly Earnings</Typography>
            <Typography variant="h3">₹28,400</Typography>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Total Rides</Typography>
            <Typography variant="h3">45</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 200, justifyContent: 'center' }}>
            <Typography variant="h6" gutterBottom>Verify Ticket</Typography>
            <Button variant="contained" size="large" onClick={() => router.push('/driver/scan')}>Scan QR Code</Button>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Payments</Typography>
            <Box>
              {[{ id: '#1234', amount: '₹150' }, { id: '#1235', amount: '₹50' }, { id: '#1236', amount: '₹200' }].map((ride, i, arr) => (
                <Box key={ride.id} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: i < arr.length - 1 ? '1px solid #eee' : 'none' }}>
                  <Typography>Ride {ride.id}</Typography>
                  <Typography color="green">+ {ride.amount}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
