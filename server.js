const { parse } = require('url');
const express = require('express');
const next = require('next');
const WebSocket = require('ws');

const app = express();
const server = app.listen(3000);
const wss = new WebSocket.WebSocketServer({ noServer: true });
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });

nextApp.prepare().then(() => {
  app.use((req, res, next) => {
    nextApp.getRequestHandler()(req, res, parse(req.url, true));
  });

  wss.on('connection', (ws) => {
		let interval = setInterval(() => ws.send(process.env.SECRET), 5000);
    ws.on('close', () => clearInterval(interval));
  });

  server.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url || '/', true);

    if (pathname === '/_next/webpack-hmr') {
      nextApp.getUpgradeHandler()(req, socket, head);
    }

    if (pathname === '/api/ws') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    }
  });
});
