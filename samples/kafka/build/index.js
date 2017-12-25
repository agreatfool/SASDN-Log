"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const kafkaqueue_pb_1 = require("./proto/kafkaqueue/kafkaqueue_pb");
const MSClientKafkaQueue_1 = require("./clients/kafkaqueue/MSClientKafkaQueue");
const index_1 = require("../../../index");
const setTimeoutAsync = util.promisify(setTimeout);
var TOPIC;
(function (TOPIC) {
    TOPIC["SYSTEM"] = "SystemTopic";
    TOPIC["BUSINESS"] = "BusinessTopic";
    TOPIC["DATACENTER"] = "DataCenterTopic";
})(TOPIC = exports.TOPIC || (exports.TOPIC = {}));
class KafkaLogger extends index_1.Logger {
    sendMessage(message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new MSClientKafkaQueue_1.default(`${options.kafkaHost}:${options.kafkaPort}`);
            const request = new kafkaqueue_pb_1.SendRequest();
            let response;
            request.setTopic(options.kafkaTopic || TOPIC.BUSINESS);
            request.setMessagesList([message]);
            try {
                response = yield client.send(request);
                return response.getResult();
            }
            catch (error) {
                return false;
            }
        });
    }
}
const logger = new KafkaLogger({
    kafkaHost: '127.0.0.1',
    kafkaPort: 9090,
    kafkaTopic: TOPIC.BUSINESS,
    loggerName: 'test',
    loggerLevel: index_1.LEVEL.INFO,
});
function testLogs() {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield setTimeoutAsync(2000);
        }
        for (let i = 1; i <= 5; i++) {
            logger.info(`This is a business message: #${Date.now()}`);
            yield setTimeoutAsync(2000);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield testLogs();
    });
}
main().then(_ => _);
