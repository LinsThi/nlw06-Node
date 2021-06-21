import express, { response } from 'express';

const app = express();

app.get('/test', (request, response) => {
  return response.send("Olá NLW");
});

app.post('/test-post', (request, response) => {
  return response.send("Olá NLW-post");
})

app.listen(3000, () => {
  console.log('Back-end tá on 🎉');
});