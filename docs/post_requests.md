# POST requests.

The body of a POST request to a Sunport server is always UTF-8 JSON.

Every JSON document has three keys in common:

| Key        | Data type | Description                                  |
|------------|-----------|----------------------------------------------|
| `"type"`   | `string`  | The request type.                            |
| `"common"` | `boolean` | `true` if the request affects all the users. |
| `"id"`     | `string`  | ID of the user who sent the request.         |

> **`"common"`** should only be **`true` IF `"id"` IS AN ADMIN ID**. \
> [See '`admin` type requests' ...](admin_requests.md)

## Request types (`"type"` values).

| Value    | Access level         | Description                                          |
|----------|:--------------------:|------------------------------------------------------|
| `chain`  | USER                 | Inserts `chain.json` content into the response body. |
| `admin`  | USER                 | Tells the client if `"id"` is an admin ID.           |
| `add`    | ADMIN                | Adds money to a user.                                |
| `end`    | ADMIN                | Ends the vacation.                                   |
| `loss`   | `"common"` DEPENDENT | Removes some money.                                  |
| `loan`   | `"common"` DEPENDENT | Creates a loan node.                                 |
| `return` | `"common"` DEPENDENT | Closes a loan node.                                  |

> '`"common"` DEPENTENT access level' means that if `"common"` is `true`, the access level is ADMIN, otherwise, USER.

## Request bodies by type.

**`chain`**

```json
{
	"type": "chain",
	"common": false,
	"id": <USER_ID string>,
}
```

---

**`admin`**

```json
{
	"type": "admin",
	"common": false,
	"id": <USER_ID string>,
}
```

---

**`add`**

```json
{
	"type": "add",
	"common": false,
	"id": <USER_ID string>,
	"toid": <RECIPIENT_USER_ID string>,
	"money": <MONEY number>,
	"desc": <DESCRIPTION string>
}
```

---

**`end`**

```json
{
	"type": "end",
	"common": false,
	"id": <USER_ID string>,
}
```

---

**`loss`**

```json
{
	"type": "loss",
	"common": <IS_COMMON boolean>,
	"id": <USER_ID string>,
	"money": <MONEY number>,
	"desc": <DESCRIPTION string>
}
```

---

**`loan`**

```json
{
	"type": "loan",
	"common": <IS_COMMON boolean>,
	"id": <USER_ID string>,
	"loanid": <LOAN_ID string>,
	"money": <MONEY number>,
	"desc": <DESCRIPTION string>
}
```

---

**`return`**

```json
{
	"type": "return",
	"common": <IS_COMMON boolean>,
	"id": <USER_ID string>,
	"loanid": <LOAN_ID string>,
}
```

<style>table{width:100%} th{width:50%}</style>

| [< PREVIOUS](options_requests.md) | [NEXT >](chain_requests.md) |
|:---------------------------------:|:---------------------------:|
