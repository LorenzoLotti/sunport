# Invalid POST requests.

If a Sunport server receives a POST request with an invalid `"id"` or with `"common"` set to `true` while `"id"` isn't an admin ID, the response's body is:

```json
{
	"error": true,
	"desc": "access_denied"
}
```

If a Sunport server receives an `add` type POST request while `"id"` isn't an admin ID, the response's body is:

```json
{
	"error": true,
	"desc": "access_denied:add"
}
```

If a Sunport server receives an `end` type POST request while `"id"` isn't an admin ID, the response's body is:

```json
{
	"error": true,
	"desc": "access_denied:end"
}
```

| [< PREVIOUS](post_requests.md) | [NEXT >](chain_requests.md) |
|:------------------------------:|:---------------------------:|
