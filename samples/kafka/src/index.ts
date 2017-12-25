import * as util from 'util';
import { SendRequest, SendResponse } from './proto/kafkaqueue/kafkaqueue_pb';
import MSClientKafkaQueue from './clients/kafkaqueue/MSClientKafkaQueue';
import { LEVEL, Logger, KafkaOptions } from '../../../index';

const setTimeoutAsync = util.promisify(setTimeout);

export enum TOPIC {
  SYSTEM = 'SystemTopic',
  BUSINESS = 'BusinessTopic',
  DATACENTER = 'DataCenterTopic'
}

class KafkaLogger extends Logger {
  async sendMessage(message: string, options?: KafkaOptions): Promise<boolean> {
    const client = new MSClientKafkaQueue(`${options.kafkaHost}:${options.kafkaPort}`);
    const request = new SendRequest();
    let response: SendResponse;
    request.setTopic(options.kafkaTopic || TOPIC.BUSINESS);
    request.setMessagesList([message]);
    try {
      response = await client.send(request);
      return response.getResult();
    }
    catch (error) {
      return false;
    }
  }
}

const logger: KafkaLogger = new KafkaLogger({
  kafkaHost: '127.0.0.1',
  kafkaPort: 9090,
  kafkaTopic: TOPIC.BUSINESS,
  loggerName: 'test',
  loggerLevel: LEVEL.INFO,
});

async function testLogs(): Promise<any> {
  /*
  logger.log('This is a message');
  logger.log('This is a message', LEVEL.WARN);
  logger.log('This is a message', LEVEL.WARN, TOPIC.SYSTEM);
  logger.info('This is another message', TOPIC.SYSTEM);
  logger.debug('This message will not be seen on console if loggerLevel < LEVEL.DEBUG');
  logger.warn('This is a warn message');
  logger.error('This is a error message');
  */

  for (let i = 1; i <= 5; i++) {
    logger.info(`This is a system message: #${Date.now()}`, { kafkaTopic: TOPIC.SYSTEM });
    await setTimeoutAsync(2000);
  }

  for (let i = 1; i <= 5; i++) {
    logger.info(`This is a business message: #${Date.now()}`);
    await setTimeoutAsync(2000);
  }
}

async function main(): Promise<any> {
  await testLogs();
}

main().then(_ => _);
