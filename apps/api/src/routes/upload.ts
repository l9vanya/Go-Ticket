import { Hono } from 'hono';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const upload = new Hono();

upload.post('/', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;

    if (!file) return c.json({ error: 'No file uploaded' }, 400);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name);
    const filename = `${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), 'uploads');

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    const baseUrl = process.env.API_URL || 'http://localhost:8787';
    return c.json(`${baseUrl}/uploads/${filename}`);
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Upload failed' }, 500);
  }
});

export default upload;
