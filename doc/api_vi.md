
## **API Doc**

Return format

```
{
  "data": {
    ...
  },
  "status": {
    "code": 0,
    "message": "Request Success!"
  }
}
```

## **User**

### Register a New User

```
POST /api/vi/register
```

Parameter

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| username | String | true | E-Mail of New User |
| password | String | true | Password of New User |

Return Data

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | New User ID |
| username | String | New User Name |
| email | String | New User E-Mail |
| accesskey | UUID | New User Access Token |
| create_at | Date | New User Create Time |
| update_at | Date | Last Update Time |

### Register a New User

```
POST /api/vi/register
```

Parameter

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| username | String | true | E-Mail of New User |
| password | String | true | Password of New User |