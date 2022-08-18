import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import request, { get } from 'request';

const app: Express = express();
const port = process.env.PORT ?? 0;

app.get('/health-check', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/', (req, res) => {
  if (!req?.query?.url) {
    res.end();
    return;
  }

  try {
    const url = decodeURIComponent(req.query.url.toString());
    get(url)
      .on('response', (response: request.Response) => {
        response.headers['cross-origin-resource-policy'] = 'cross-origin';
      })
      .pipe(res);
  } catch (error) {
    console.error(error);
    res.end();
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Image Proxy is running at https://localhost:${port}`);
});
