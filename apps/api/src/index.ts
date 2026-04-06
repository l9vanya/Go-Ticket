import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import authRoutes from './routes/auth';
import ticketRoutes from './routes/tickets';
import uploadRoutes from './routes/upload';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.route('/api/auth', authRoutes);
app.route('/api/tickets', ticketRoutes);
app.route('/api/upload', uploadRoutes);

app.get('/health', (c) => c.json({ status: 'ok' }));

const port = Number(process.env.PORT) || 8787;

serve({ fetch: app.fetch, port }, () => {
  console.log(`API running on http://localhost:${port}`);
});

export default app;
