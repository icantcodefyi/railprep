import { Hono } from 'hono';
import { cors } from "hono/cors"
import adminRoutes from './routes/admin'
import publicRoutes from './routes/public'
import aiChatRoutes from './routes/ai-chat'

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

// AI chat routes
app.route('/ai', aiChatRoutes)

export default app;
