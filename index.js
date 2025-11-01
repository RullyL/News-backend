import app from './api/index.js';

export default function handler(req, res) {
  return app(req, res);
}
