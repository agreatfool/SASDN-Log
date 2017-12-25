import { BaseOptions } from './BaseOptions';
export declare enum TRANSPORT {
    TCP = 1,
    UDP = 2,
}
export interface SyslogOptions extends BaseOptions {
    syslogHost?: string;
    syslogPort?: number;
    transport?: TRANSPORT;
}
