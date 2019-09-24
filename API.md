# API DOCUMENTS

## AUTH
### **[POST]** : `/auth/signup`
```json
// body
{
	"email": "code@code.com",
	"username": "code",
	"password": "0000"
}
```

```json
// response
{
    "id": 1,
    "email": "code@code.com",
    "username": "code",
    "password": "$2b$12$jnGHY9fef.hqblgi8JvUee.nBPyy4lM8AlcHkGu8o1wsenbaQUIRa",
    "updatedAt": "2019-09-24T02:58:18.990Z",
    "createdAt": "2019-09-24T02:58:18.990Z"
}
```

### **[POST]** : `/auth/login`
```json
// body
{
	"email": "code@code.com",
	"password": "0000"
}
```
```json
// response
{
    "id": 1,
    "email": "code@code.com",
    "password": "$2b$12$jnGHY9fef.hqblgi8JvUee.nBPyy4lM8AlcHkGu8o1wsenbaQUIRa",
    "username": "code",
    "userImage": null,
    "intro": null,
    "createdAt": "2019-09-24T02:58:18.000Z",
    "updatedAt": "2019-09-24T02:58:18.000Z"
}
```

### **[GET]** : `/auth/logout`
```json
// response
Logout success
```
---
## POSTS
### **[POST]** : `/post`
```json
// body
{
	"title": "TEST1",
	"content": "1234",
	"emotion": "happy"
}
```
```json
// response
{
    "id": 1,
    "userId": 1,
    "title": "TEST1",
    "content": "1234",
    "emotion": "happy",
    "updatedAt": "2019-09-24T03:02:40.113Z",
    "createdAt": "2019-09-24T03:02:40.113Z"
}
```

### **[GET]** : `/post/:id`

```json
// GET /post/1
// response
{
    "id": 1,
    "title": "TEST1",
    "content": "1234",
    "userId": 1,
    "emotion": "happy",
    "createdAt": "2019-09-24T03:02:40.000Z",
    "updatedAt": "2019-09-24T03:02:40.000Z",
    "user": {
        "email": "code@code.com",
        "username": "code",
        "userImage": null
    }
}
```

## EMOTION
### **[GET]** : `/emoji/:emoji`
```json
// GET /emoji/happy
// response
[
    {
        "id": 1,
        "title": "TEST1",
        "content": "1234",
        "userId": 1,
        "emotion": "happy",
        "createdAt": "2019-09-24T03:02:40.000Z",
        "updatedAt": "2019-09-24T03:02:40.000Z",
        "user": {
            "email": "code@code.com",
            "username": "code",
            "userImage": null
        }
    }
]
```