import { KafkaOptions } from './KafkaOptions';
import { SyslogOptions } from './SyslogOptions';
import { BaseOptions } from './BaseOptions';

export type LogOptions = BaseOptions | KafkaOptions | SyslogOptions;