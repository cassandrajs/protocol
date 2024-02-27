# Cassandra Protocol

This is a set of classes and types representing the frames and messages of the Apache Cassandra® native protocol, with the associated serialization and deserialization logic.

## Credits

This project was made possible with thanks to **DataStax**.

This is a port of [https://github.com/datastax/native-protocol/](https://github.com/datastax/native-protocol/) from Java to TypeScript.

## Usage

The code is agnostic about the underlying binary representation: start by implementing a `PrimitiveCodec` for your target type `B` (which could be `ByteBuffer`, Netty's `ByteBuf`,  
`byte[]`, etc.)

You may also implement a `Compressor<B>` (it can be `Compressor.none()` if you're not going to compress frames).

Finally, build a `FrameCodec<B>` that will allow you to encode and decode frames.

`Frame.defaultClient` and `Frame.defaultServer` give you the default sets of codecs for the protocol versions that are currently supported; alternatively, you can use the constructor to register an arbitrary set of codecs.

`Frame`, `Message`, and `Message` subclasses are immutable, but for efficiency they don't make defensive copies of their fields. If these fields are mutable (for example collections), they shouldn't be modified after creating a message instance.

The code makes very few assumptions about how the messages will be used. Data is often represented in the most simple way. For example, `ProtocolConstants` uses simple constants to represent the  
protocol codes; client code can (and probably should) wrap them in more type-safe structures (such as enums) before exposing them to higher-level layers.

Well-formed inputs are expected; if you pass an inconsistent `Frame` (ex: protocol v3 with a custom payload), an `IllegalArgumentException` will be thrown.

## Disclaimers

DataStax is a registered trademark of DataStax, Inc. and its subsidiaries in the United States and/or other countries.

Apache Cassandra, Apache, Tomcat, Lucene, Solr, Hadoop, Spark, TinkerPop, and Cassandra are trademarks of the [Apache Software Foundation](http://www.apache.org/) or its subsidiaries in Canada, the United States and/or other countries.
