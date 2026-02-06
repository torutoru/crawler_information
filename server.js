import express from 'express';
import bodyParser from 'body-parser';
import { getObject, putObject } from './firebaseDB.js';

const PORT = 5959;
const app = express();
app.use(bodyParser.json());

app.post("/google-chat", async (req, res) => {
    console.log("Google Chat 요청:", req.body);

    const user = req.body.user.displayName || 'UNKWON';
    const message = req.body.message?.text || "";

    let reply = `안녕하세요 🙂 ${user} 님.`;

    if (message.includes("주식")) {
        reply += "📈 오늘 추천 주식: AAPL";
    }

    if (message.includes("ping")) {
        reply += "pong 🏓";
    }

    return res.json({
        text: reply
    });
});

app.post('/crawler_new_data', (req, res) => {

});

app.get("/", async (req, res) => {
  const d = await getObject('test');
  console.log(d);
  return res.send('ok');
});

app.get("/test", async (req, res) => {
  const d = await putObject('test', { name: 'kkk', keyword: ['정치', '문화', '사회']});
  console.log(d);
  return res.send('ok');
});

app.listen(PORT, () => {
    console.log(`CRAWLER INFORMATION START. PORT: ${PORT}`);
});

