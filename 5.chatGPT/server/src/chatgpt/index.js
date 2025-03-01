require('http');
const axios = require('axios').default;
const request = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});
const chatCompletionURL = `https://api.openai.com/v1/chat/completions`;
const modelName = 'gpt-3.5-turbo';
const history = [];

async function sendMessage(msgInfo, { onData, onEnd, onError }) {
  const userMsg = {
    role: 'user',
    content: msgInfo.content,
  };
  history.push(userMsg);
  const resp = await request.post(
    chatCompletionURL,
    {
      model: modelName,
      messages: history,
      stream: true,
      temperature: msgInfo.temperature
    },
    {
      responseType: 'stream',
    }
  );
  const stream = resp.data;
  const respMsg = {
    role: 'assistant',
    content: '',
  };
  stream.on('data', (chunk) => {
    const lines = chunk
      .toString()
      .split('\n')
      .filter((line) => line.trim() !== '');
    for (const line of lines) {
      const message = line.replace(/^data: /, '');
      if (message === '[DONE]') {
        return;
      }
      try {
        const parsed = JSON.parse(message);
        const content = parsed.choices[0].delta.content;
        if (content === undefined) {
          continue;
        }
        respMsg.content += content;
        onData && onData(content);
      } catch (error) {
        console.error('Could not JSON parse stream message', message, error);
      }
    }
  });
  stream.on('end', (err) => {
    onEnd && onEnd(err);
  });
  stream.on('error', () => {
    history.push(respMsg);
    onError && onError();
  });
}

function clear() {
  history.length = 0;
}

module.exports = {
  sendMessage,
  clear,
};
