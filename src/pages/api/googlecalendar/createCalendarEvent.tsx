import type { NextApiRequest, NextApiResponse } from 'next';
import { calendar_v3, google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { accessToken, date, summary } = req.body;

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );
      oauth2Client.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

      const event: calendar_v3.Schema$Event = {
        summary: summary,
        start: { date: date }, // date format 'YYYY-MM-DD'
        end: { date: date },
      };

      calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
      }, (err, response) => {
        if (err) {
          console.error('Error creating calendar event:', err);
          res.status(500).json({ message: 'Error creating event', error: err.message });
          return;
        }
      
        if (response) {
          res.status(200).json({ message: 'Event created successfully', event: response.data });
        } else {
          res.status(500).json({ message: 'Error: No response received from the Calendar API' });
        }
      });      
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating calendar event:', error);
        res.status(500).json({ message: 'Error creating event', error: error.message });
      } else {
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
