// utils/mailchimp.ts

const API_KEY = 'YOUR_MAILCHIMP_API_KEY';
const LIST_ID = 'YOUR_MAILCHIMP_LIST_ID';
const DATACENTER = API_KEY.split('-')[1]; // This is the last part of your API key
const URL = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/`;

export const addToMailchimpList = async (email: string): Promise<any> => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to add to Mailchimp');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
