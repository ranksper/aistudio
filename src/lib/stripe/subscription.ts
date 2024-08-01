"use server";

const stripe = require("stripe")(process.env.NEXT_STRIPE_SECRET_API_KEY);

export const checkUserSubscription = async (email: string) => {
    const customer = await stripe.customers.list({
        email: email,
    });

    if (customer.data.length === 0) {
        return null;
    }

    const subscriptions = await stripe.subscriptions.list({
        customer: customer.data[0].id,
    });

    if (subscriptions.data.length === 0) {
        return null;
    }

    return subscriptions.data[0];
};
