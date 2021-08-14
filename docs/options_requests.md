# OPTIONS requests.

If a Sunport server receives an OPTIONS request, the response will be:

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: Content-Type
```

| [< PREVIOUS](chain_json.md) | [NEXT >](post_requests.md) |
|:---------------------------:|:--------------------------:|
