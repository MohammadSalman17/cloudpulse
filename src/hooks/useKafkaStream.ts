import { useState, useEffect, useRef, useCallback } from 'react';

export interface StreamEvent {
  type: string;
  timestamp?: string;
  [key: string]: any;
}

export function useKafkaStream(url: string = '/api/kafka/consume') {
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const esRef = useRef<EventSource | null>(null);

  const connect = useCallback(() => {
    if (esRef.current) esRef.current.close();
    try {
      const es = new EventSource(url);
      esRef.current = es;

      es.onopen = () => {
        setConnected(true);
        setError(null);
      };

      es.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          if (data.type === 'ping') return;
          setEvents((prev) => [data, ...prev].slice(0, 200));
        } catch {}
      };

      es.onerror = () => {
        setConnected(false);
        setError('SSE connection lost');
        es.close();
      };
    } catch (e: any) {
      setError(e?.message || 'Failed to connect');
    }
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      if (esRef.current) esRef.current.close();
    };
  }, [connect]);

  return { events, connected, error, reconnect: connect };
}
