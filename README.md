# SASDN-Log

## 1. 简介

SASDN-Log是对日志进行的封装，使日志的查看和调用更加清晰和明确

## 2. 如何使用

继承`Logger`类并实现`sendMessage`方法，`sendMessage`可以自由定义一些消息日志的收集。
详细可参考`samples/kafka`下的范例，此范例介绍了将日志消息推送至Kafka微服务中。