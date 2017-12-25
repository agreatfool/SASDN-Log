import { KafkaOptions } from './KafkaOptions';
import { SyslogOptions } from './SyslogOptions';
import { BaseOptions } from './BaseOptions';
export declare type LogOptions = BaseOptions | KafkaOptions | SyslogOptions;
