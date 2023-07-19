import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf!.toString(), sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
      const error = err as Error;
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent was successful!', paymentIntent);


  // // Extract the customer's email. Please note you need to make sure the customer's email is associated 
  // // with the payment intent data in your Stripe checkout process.
  // const customerEmail = paymentIntent.receipt_email; 

  // // Update the user in the database.
  // if (customerEmail) {
  //   try {
  //     const user = await User.findOneAndUpdate(
  //       { email: customerEmail },
  //       { isActive: true },
  //       { new: true }  // This option asks Mongoose to return the updated user model.
  //     );
  
  //     if (user) {
  //       console.log(`User subscription status updated!`, user);
  //     } else {
  //       console.error(`No user found with email: ${customerEmail}`);
  //     }
  //   } catch (err) {
  //     console.error(`Failed to update user subscription status: ${err}`);
  //   }
  // }

  // console.log('PaymentIntent was successful!', paymentIntent);


        break;
      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge;
        console.log('Charge was successful!', charge);
        break;
      case 'payment_intent.created':
        const paymentIntentCreated = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent was created!', paymentIntentCreated);
        break;

      case 'customer.subscription.created':
        const subscriptionCreated = event.data.object as Stripe.Subscription;
        console.log('Subscription was created!', subscriptionCreated);
        // set isActive to true
        break;
      case 'customer.subscription.updated':
        const subscriptionUpdated = event.data.object as Stripe.Subscription;
        console.log('Subscription was updated!', subscriptionUpdated);
        // update isActive based on the new subscription status
        break;
      case 'customer.subscription.deleted':
        const subscriptionDeleted = event.data.object as Stripe.Subscription;
        console.log('Subscription was deleted!', subscriptionDeleted);
        // set isActive to false
        break;
      case 'invoice.payment_failed':
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment failed!', invoice);
        // set isActive to false
        break;  

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
