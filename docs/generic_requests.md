# Other types requests.

If a Sunport server receives an `add`, `end`, `loss`, `loan` or `return` type POST request, (if the request is valid) the request's body is appended to the `"chain"` array in the `chain.json` file as JSON object and the response's body is:

```json
{
	"error": false,
	"desc": "req_ok"
}
```

| [< PREVIOUS](admin_requests.md) | [NEXT >](other_requests.md) |
|:-------------------------------:|:---------------------------:|
