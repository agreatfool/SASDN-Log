import { BaseOptions } from './BaseOptions';

export enum TRANSPORT {
  TCP = 1, UDP
}

export interface SyslogOptions extends BaseOptions {
  syslogHost?: string;
  syslogPort?: number;
  transport?: TRANSPORT;
}