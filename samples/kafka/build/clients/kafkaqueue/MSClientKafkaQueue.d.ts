import { SendRequest, SendResponse } from '../../proto/kafkaqueue/kafkaqueue_pb';
export default class MSClientKafkaQueue {
    private _client;
    constructor(address: string);
    send(request: SendRequest): Promise<SendResponse>;
}
