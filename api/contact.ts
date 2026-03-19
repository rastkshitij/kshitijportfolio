import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    console.log("Contact form submission:", { name, email, message });
    
    return res.status(200).json({ 
      success: true, 
      message: "Message received! I'll get back to you soon." 
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
