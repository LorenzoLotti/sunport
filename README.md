# What is Sunport?

Sunport is a simple system to managing money of a group of friend on vacation.

# How to use it?

First you need a server that follows the [Sunport Standard](docs/standard.md), then you have to make clients able to access the server using the appropriate query string for the Sunport frontend (https://lorenzolotti.github.io/sunport).

**Query string supported parameters:**

| Parameter	| Value               | Optional |
|-----------|---------------------|:--------:|
| secure    |                     | YES      |
| addr      | The server address. | NO       |
| port      | The server port.    | YES      |
| id        | The user ID.        | NO       |

# The Sunport Standard

To create your own Sunport backend implementation you need to follow the [Sunport Standard documentation](docs/standard.md).
