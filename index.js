const Fastify = require('fastify');
const verifyKeyMiddleware = require('./verifyKeyMiddleware');

const app = Fastify({ logger: true });

app.post('/api/interactions', { preHandler: verifyKeyMiddleware }, async (request, reply) => {
  const { type, data } = request.body;

  if (type === 1) {
    // Respond to Discord PING
    return { type: 1 };
  }

  if (data?.name === 'ping') {
    // Respond to /ping command
    return {
      type: 4,
      data: {
        content: 'Pong!',
      },
    };
  }

  return {
    type: 4,
    data: {
      content: 'Unknown command',
    },
  };
});

app.get('/', async (request, reply) => {
  reply.send({ message: 'Discord bot is running!' });
});

module.exports = app;

