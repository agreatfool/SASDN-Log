"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = require("grpc");
const kafkaqueue_grpc_pb_1 = require("../../proto/kafkaqueue/kafkaqueue_grpc_pb");
class MSClientKafkaQueue {
    constructor(address) {
        this._client = new kafkaqueue_grpc_pb_1.KafkaQueueServiceClient(address, grpc.credentials.createInsecure());
    }
    send(request) {
        return new Promise((resolve, reject) => {
            this._client.send(request, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
}
exports.default = MSClientKafkaQueue;
