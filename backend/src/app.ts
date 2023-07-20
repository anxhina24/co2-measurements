import express from 'express';
import { generateRandomCO2Value } from './co2Generator';
import { Request, Response } from 'express';
import cors from 'cors';

const app = express(); //Create an instance of express aplication
const PORT = 3001; //Port number
app.use(cors()); //Enable cross to allow cross-origin requests

interface RandomCO2Response {
  co2?: number;
  error?: string;
}
const MIN_CO2_VALUE = 400;
const MAX_CO2_VALUE = 3500;

// Endpoint to get a random CO2 measurement value
app.get('/random-co2', (req: Request, res: Response<RandomCO2Response>) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  try {
    // Generate and send the initial random CO2 value to the connected client.
    const co2Value = generateRandomCO2Value(MIN_CO2_VALUE, MAX_CO2_VALUE);
    res.write(`data: ${JSON.stringify({ co2: co2Value })}\n\n`);

    // Periodically send updates to the connected client
    const intervalId = setInterval(() => {
      const co2Value = generateRandomCO2Value(MIN_CO2_VALUE, MAX_CO2_VALUE);
      res.write(`data: ${JSON.stringify({ co2: co2Value })}\n\n`);
    }, 10000);

    // Clean up the interval when the client disconnects
    res.on('close', () => {
      clearInterval(intervalId);
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
