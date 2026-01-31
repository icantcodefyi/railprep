import { Hono } from 'hono';
import { cors } from "hono/cors"
import adminRoutes from './routes/admin'
import publicRoutes from './routes/public'

const app = new Hono()
  .basePath('api');

app.use(cors({
  origin: "*"
}))

// Health check
app.get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }));

// Admin routes for content population (your content pipeline)
app.route('/admin', adminRoutes)

// Public routes for user-facing app
app.route('/v1', publicRoutes)

export default app;
