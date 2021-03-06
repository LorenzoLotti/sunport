# The `chain.json` file

The `chain.json` file is stored on a Sunport server and contains data of every operation performed by clients.

The file is initialized like this:

```json
{
	"error": false,
	"desc": "req_ok:chain",

	"chain":
	[
		{
			<USER_ID>: <MONEY:number>,
			<USER_ID>: <MONEY:number>,
			<USER_ID>: <MONEY:number>,
			...
		}
	]
}
```

where `<USER_ID>` is a user ID and `<MONEY>` is a JSON number which represents the user's initial amount of money.

>`chain.json` will be modified every time a user performs an operation such as a money loss by appending objects to the `"chain"` array. \
>[See 'Other types requests' ...](generic_requests.md)

| [NEXT >](options_requests.md) |
|:-----------------------------:|
