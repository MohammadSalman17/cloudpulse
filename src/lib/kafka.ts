import { Kafka, logLevel } from 'kafkajs';

const kafkaBootstrap = process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092';
const useSsl = process.env.KAFKA_USE_SSL === 'true';

export function createKafkaClient() {
  return new Kafka({
    clientId: 'cloudpulse-web',
    brokers: kafkaBootstrap.split(','),
    ssl: useSsl || undefined,
    sasl:
      process.env.KAFKA_API_KEY && process.env.KAFKA_API_SECRET
        ? {
            mechanism: 'plain',
            username: process.env.KAFKA_API_KEY,
            password: process.env.KAFKA_API_SECRET,
          }
        : undefined,
    logLevel: logLevel.ERROR,
  });
}

export const KAFKA_TOPIC = process.env.KAFKA_TOPIC || 'cloudpulse-events';
