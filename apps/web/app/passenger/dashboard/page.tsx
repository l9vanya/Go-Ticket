'use client';

import React from 'react';
import { Container, Paper, Typography, Button, Box, List, ListItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTickets } from '@/context/TicketContext';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

export default function PassengerDashboard() {
  const router = useRouter();
  const { tickets } = useTickets();
  const recentTickets = tickets.slice(0, 3);

  const getTransportIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('bus')) return <DirectionsBusIcon color="primary" />;
    if (t.includes('cab')) return <DirectionsCarIcon color="primary" />;
    if (t.includes('bike')) return <TwoWheelerIcon color="primary" />;
    return <DirectionsCarIcon color="action" />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Passenger Dashboard</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 200, justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>Book a Ride</Typography>
            <Button variant="contained" onClick={() => router.push('/passenger/book')}>Book Now</Button>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 200, justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>My Tickets</Typography>
            <Button variant="outlined" onClick={() => router.push('/passenger/tickets')}>View Tickets</Button>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Recent Activity</Typography>
          {recentTickets.length === 0 ? (
            <Typography variant="body2" color="textSecondary">No recent rides.</Typography>
          ) : (
            <List>
              {recentTickets.map((ticket, index) => (
                <React.Fragment key={ticket.id}>
                  <ListItem>
                    <ListItemIcon>{getTransportIcon(ticket.type)}</ListItemIcon>
                    <ListItemText primary={`${ticket.source} to ${ticket.destination}`} secondary={`${new Date(ticket.date).toLocaleString()} - ${ticket.type}`} />
                    <Typography variant="body1">₹{ticket.price}</Typography>
                  </ListItem>
                  {index < recentTickets.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
