'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export interface Ticket {
  id: string;
  source: string;
  destination: string;
  type: string;
  price: number;
  date: string;
  userId?: string;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id'>) => Promise<Ticket | undefined>;
  removeTicket: (id: string) => Promise<void>;
  loading: boolean;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          const response = await fetch(`${API}/api/tickets/${user.id}`);
          if (response.ok) setTickets(await response.json());
        } catch (error) {
          console.error('Failed to fetch tickets', error);
        } finally {
          setLoading(false);
        }
      } else {
        setTickets([]);
      }
    };
    fetchTickets();
  }, [user]);

  const addTicket = async (ticketData: Omit<Ticket, 'id'>): Promise<Ticket | undefined> => {
    if (!user?.id) return;
    const response = await fetch(`${API}/api/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...ticketData, userId: user.id }),
    });
    if (response.ok) {
      const newTicket = await response.json();
      setTickets((prev) => [newTicket, ...prev]);
      return newTicket;
    }
  };

  const removeTicket = async (id: string) => {
    const response = await fetch(`${API}/api/tickets/${id}`, { method: 'DELETE' });
    if (response.ok) setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, removeTicket, loading }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) throw new Error('useTickets must be used within a TicketProvider');
  return context;
};
