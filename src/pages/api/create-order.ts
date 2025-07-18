import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_live_cj7p38TK7a9gjx",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "9dTfQ3eGf34f951MEvwbOy6t",
});

// Constants
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 5000 * 100; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Validate request method
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  // Validate amount
  const amount = Number(req.body.amount);
  if (!amount || isNaN(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    return res.status(400).json({
      success: false,
      error: `Amount must be between ₹${MIN_AMOUNT/100} and ₹${MAX_AMOUNT/100}`
    });
  }

  try {
    // Create order
    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: `order_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      notes: {
        description: 'API Credits Purchase'
      }
    });

    return res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    // Log error for debugging
    console.error('Razorpay order creation failed:', error);

    // Handle specific Razorpay errors
    
    if ((error as any).error?.description) {
      return res.status(400).json({
        success: false,
        
        error: (error as any).error.description
      });
    }

    // Generic error response
    return res.status(500).json({
      success: false,
      error: 'Failed to create order'
    });
  }
}

// Configure route options
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '16kb'
    }
  }
};