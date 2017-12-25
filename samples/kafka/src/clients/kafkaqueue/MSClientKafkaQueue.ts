import * as grpc from 'grpc';
import { KafkaQueueServiceClient } from '../../proto/kafkaqueue/kafkaqueue_grpc_pb';
import { SendRequest, SendResponse } from '../../proto/kafkaqueue/kafkaqueue_pb';

export default class MSClientKafkaQueue {
  private _client: KafkaQueueServiceClient;

  public constructor(address: string) {
    this._client = new KafkaQueueServiceClient(address, grpc.credentials.createInsecure());
  }

  public send(request: SendRequest): Promise<SendResponse> {
    return new Promise((resolve, reject) => {
      this._client.send(request, (err, res: SendResponse) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }
}
