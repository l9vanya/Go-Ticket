import { Hono } from 'hono';
import { prisma } from '../db';

const tickets = new Hono();

// Create ticket
tickets.post('/', async (c) => {
  try {
    const { userId, source, destination, type, price, date } = await c.req.json();

    if (!userId || !source || !destination || !type || price == null) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const ticket = await prisma.ticket.create({
      data: {
        userId,
        source,
        destination,
        type,
        price: Number(price),
        date: date ? new Date(date) : new Date(),
      },
    });

    return c.json({ ...ticket, date: ticket.date.toISOString() }, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Failed to create ticket' }, 500);
  }
});

// Get user tickets
tickets.get('/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const data = await prisma.ticket.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    return c.json(data.map((t) => ({ ...t, date: t.date.toISOString() })));
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Failed to fetch tickets' }, 500);
  }
});

// Delete ticket
tickets.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await prisma.ticket.delete({ where: { id } });
    return c.json({ message: 'Ticket deleted' });
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Failed to delete ticket' }, 500);
  }
});

export default tickets;
