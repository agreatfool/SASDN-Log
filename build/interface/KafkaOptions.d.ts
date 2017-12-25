import { BaseOptions } from './BaseOptions';
export interface KafkaOptions extends BaseOptions {
    kafkaHost?: string;
    kafkaPort?: number;
    kafkaTopic?: string;
}
