import { handle } from 'hono/vercel'
import app from '../src/api/index'

export const config = {
  runtime: 'edge',
  regions: ['iad1'], // You can change this to your preferred region
}

export default handle(app)
