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
			<ID>: <MONEY number>,
			<ID>: <MONEY number>,
			<ID>: <MONEY number>,
			...
		}
	]
}
```

where `<ID>` is a user ID and `<MONEY>` is a JSON number which represents the user's initial amount of money.

`chain.json` will be modified every time a user performs an operation such as a money loss by appending objects to the `"chain"` array. \
[See 'Other types requests' ...](other_requests.md)

<style>table{width:100%} th{width:50%}</style>

|   | [NEXT >](options_requests.md) |
|:-:|:-----------------------------:|
