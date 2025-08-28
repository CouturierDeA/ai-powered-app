import express from 'express';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.get('/', (req: Request, res: Response) => {
   res.send('Test');
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.send({
      message: 'Hello',
   });
});

app.listen(port, () => {
   console.log(`Server started on http://localhost:${port}`);
});
