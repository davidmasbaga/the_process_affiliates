// pages/api/logger.js

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Comprobar el método HTTP
  if (req.method === 'POST') {
    // Registra el mensaje en la consola del servidor (se mostrará en los logs de Vercel)
    console.log(req.body.message);
    // Responde al cliente
    res.status(200).json({ status: 'Logged successfully' });
  } else {
    // Si no es un método POST, responder con un método no permitido
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
