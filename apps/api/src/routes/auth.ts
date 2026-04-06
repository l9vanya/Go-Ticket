import { Hono } from 'hono';
import { prisma } from '../db';
import bcrypt from 'bcrypt';

const auth = new Hono();

// Register
auth.post('/register', async (c) => {
  try {
    const { name, email, password, role, vehicleNumber } = await c.req.json();

    if (!name || !email || !password || !role) {
      return c.json({ error: 'All fields are required' }, 400);
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return c.json({ error: 'Email already in use' }, 409);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role, vehicleNumber },
    });

    const { password: _, ...safeUser } = user;
    return c.json({ ...safeUser, createdAt: safeUser.createdAt.toISOString() }, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Login
auth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) return c.json({ error: 'Email and password are required' }, 400);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return c.json({ error: 'User not found' }, 404);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return c.json({ error: 'Invalid credentials' }, 401);

    const { password: _, ...safeUser } = user;
    return c.json({ ...safeUser, createdAt: safeUser.createdAt.toISOString() });
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update user
auth.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    const { password, ...safeData } = data;

    const user = await prisma.user.update({ where: { id }, data: safeData });
    const { password: _, ...safeUser } = user;
    return c.json({ ...safeUser, createdAt: safeUser.createdAt.toISOString() });
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Update failed' }, 500);
  }
});

export default auth;
