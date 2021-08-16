# Other HTTP methods requests.

If a Sunport server receives a request which method isn't POST or OPTIONS (for example GET), the response is:

```http
HTTP/1.1 405 Method Not Allowed
```

| [< PREVIOUS](generic_requests.md) |
|:---------------------------------:|
