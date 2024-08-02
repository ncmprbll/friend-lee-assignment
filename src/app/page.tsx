'use client';

import { useEffect, useState } from 'react';

let webSocket: WebSocket;
if (typeof window !== 'undefined') {
  webSocket = new WebSocket(`ws://${window.location.host}/api/ws`);
}

export default function Home() {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    webSocket.onmessage = (event) => {
      setKeys((prevKeys) => [...prevKeys, event.data]);
    };
  }, []);

  return (
    <main>
        {keys.map((key, i) => (
          <p key={i}>{key}</p>
        ))}
    </main>
  );
}
