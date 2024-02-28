import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { IProduct } from '@/types';
import stripe from '@/config/stripe';

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers();
  const { cartItems } = await req.json();
  const cartDetailsArray: IProduct[] = Object.values(cartItems) as IProduct[];

  const lineItems = cartDetailsArray.map((item: IProduct) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${headersList.get('origin')}/thank-you`,
      cancel_url: `${headersList.get('origin')}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating checkout session' });
  }
}
