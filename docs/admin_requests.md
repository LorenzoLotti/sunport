# `admin` type requests.

If a Sunport server receives an `admin` type POST request, (if the request is valid) the response's body is:

```json
{
	"error": <IS_ADMIN:boolean>,
	"desc": "req::admin"
}
```

where `<IS_ADMIN>` is a boolean value which is `true` if the request's user ID is an admin ID.

| [< PREVIOUS](chain_requests.md) | [NEXT >](generic_requests.md) |
|:-------------------------------:|:-----------------------------:|
