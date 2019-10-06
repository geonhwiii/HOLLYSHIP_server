# API DOCUMENTS

## HOLLYSHIP!

### **[GET]** : `/`
```json
# response
<h1>WELCOME TO THE HOLLSHIP!! DJ DROP THE BEAT!</h1>
```

## AUTH

### **[POST]** : `/auth/signup`
```json
# body
{
	"email": "code@code.com",
	"username": "code",
	"password": "0000"
}
```

```json
# response
{
    "message": "USER SIGNUP SUCCESS!"
}
```

### **[POST]** : `/auth/login`
```json
# body
{
	"email": "code@code.com",
	"password": "0000"
}
```
```json
# response
{
    "message": "USER LOGIN SUCCESS with TOKEN!",
    "token": "$$$$$____ACCESS_TOKEN_____$$$$$"
}
```

### **[GET]** : `/auth/logout`
```json
# response
{
    "message": "LOGOUT SUCCESS"
}
```

---

## USER

### **[GET]** : `/user`
```json
# response
[
    {
        "id": 1,
        "email": "code@code.com",
        "password": "$2b$12$y4axtBdzuU5z9WqjFhgT..jSbOCDIq.j7hvtmwsiLSXh4TY2WT/0m",
        "username": "code",
        "userImage": null,
        "intro": null,
        "createdAt": "2019-09-29T03:24:23.000Z",
        "updatedAt": "2019-09-29T03:24:23.000Z",
        "likeMusics": [],
        "likePosts": []
    }
]
```

### **[GET]** : `/user/:id`
```json
# response
{
    "id": 1,
    "email": "code@code.com",
    "password": "$2b$12$y4axtBdzuU5z9WqjFhgT..jSbOCDIq.j7hvtmwsiLSXh4TY2WT/0m",
    "username": "code",
    "userImage": null,
    "intro": null,
    "createdAt": "2019-09-29T03:24:23.000Z",
    "updatedAt": "2019-09-29T03:24:23.000Z",
    "likeMusics": [],
    "likePosts": []
}
```

### **[POST]** : `/user/img`
유저 이미지 업로드

### **[PATCH]** : `/user/:id/`
유저 정보 수정
---

## POSTS

### **[POST]** : `/post`
```json
# body
{
	"title": "TEST1",
	"content": "1234",
	"emotion": "happy"
}
```
```json
# response
{
    "message": "CREATE POST SUCCESS",
    "post": {
        "id": 1,
        "userId": 1,
        "title": "TEST1",
        "content": "1234",
        "emotion": "happy",
        "updatedAt": "2019-09-29T03:27:25.255Z",
        "createdAt": "2019-09-29T03:27:25.255Z"
    }
}
```

### **[GET]** : `/post/`

```json
# response
[
    {
        "id": 1,
        "title": "TEST1",
        "content": "1234",
        "userId": 1,
        "emotion": "happy",
        "createdAt": "2019-09-29T03:27:25.000Z",
        "updatedAt": "2019-09-29T03:27:25.000Z",
        "user": {
            "email": "code@code.com",
            "username": "code",
            "userImage": null
        },
        "comments": [],
        "likeUsers": []
    }
]
```
### **[GET]** : `/post/:id`

### **[GET]** : `/post/:userId/user`

### **[GET]** : `/post/my`

### **[PATCH]** : `/post/1`

```json
# body
{
	"title": "CHANGE TITLE",
	"content": "CHANGED",
	"emotion": "blank"
}
```

```json
# response
{
    "message": "POST UPDATED!"
}
```

### **[GET]** : `/post/:id`

```json
# response ( id: 1 )
{
    "id": 1,
    "title": "CHANGE TITLE",
    "content": "CHANGED",
    "userId": 1,
    "emotion": "blank",
    "createdAt": "2019-09-29T03:27:25.000Z",
    "updatedAt": "2019-09-29T04:15:43.000Z",
    "user": {
        "email": "code@code.com",
        "username": "code",
        "userImage": null
    },
    "comments": [],
    "likeUsers": []
}
```

### **[POST]** : `/post/:id/like`

```json
# response
{
    "message": "LIKE POST!",
    "post": {
        "id": 1,
        "userId": 1,
        "postId": 1,
        "updatedAt": "2019-09-29T03:51:06.467Z",
        "createdAt": "2019-09-29T03:51:06.467Z"
    }
}
```

### **[DELETE]** : `/post/:id/like`

```json
# response
{
    "message": "UNLIKE POST!"
}
```

### **[DELETE]** : `/post/:id`

```json
# response
{
    "message": "POST DELETED!"
}
```

## EMOTION
### **[GET]** : `/emoji/:emoji`
```json
# response ( emoji : happy)
[
    {
        "id": 1,
        "title": "TEST1",
        "content": "1234",
        "userId": 1,
        "emotion": "happy",
        "createdAt": "2019-09-29T03:27:25.000Z",
        "updatedAt": "2019-09-29T03:27:25.000Z",
        "user": {
            "email": "code@code.com",
            "username": "code",
            "userImage": null
        }
    }
]
```

---

## MUSIC

### **[POST]** : `/music`

```json
# body
{
	"title": "바람기억",
    "thumbnail": "test01",
    "artist": "나얼",
    "playTime": "05:30",
    "genre": "R&B",
    "youtubeUrl": "https://www.youtube.com"
}
```

```json
# response
{
    "message": "MUSIC POST SUCCESS",
    "music": {
        "id": 1,
        "title": "바람기억",
        "thumbnail": "test01",
        "artist": "나얼",
        "playTime": "05:30",
        "genre": "R&B",
        "youtubeUrl": "https://www.youtube.com",
        "updatedAt": "2019-09-29T04:19:43.868Z",
        "createdAt": "2019-09-29T04:19:43.868Z"
    }
}
```

### **[GET]** : `/music`

```json
# response
[
    {
        "id": 1,
        "title": "바람기억",
        "thumbnail": "test01",
        "artist": "나얼",
        "playTime": "05:30",
        "genre": "R&B",
        "likeUsers": []
    }
]
```

### **[GET]** : `/music/1`

```json
# response
{
    "id": 1,
    "title": "바람기억",
    "thumbnail": "test01",
    "artist": "나얼",
    "playTime": "05:30",
    "genre": "R&B",
    "likeUsers": []
}
```

### **[POST]** : `music/:id/list`

```json
# body
{
	"playlistId": 1
}
```
```json
# response (id: 1)
{
    "message": "Add music in playlist",
    "musicInList": {
        "musicId": 1,
        "playlistId": 1,
        "updatedAt": "2019-09-29T04:25:52.291Z",
        "createdAt": "2019-09-29T04:25:52.291Z"
    }
}
```

### **[POST]** : `music/:id/like`

```json
# response (id: 1)
{
    "message": "MUSIC LIKE!",
    "like": {
        "userId": 1,
        "musicId": 1,
        "updatedAt": "2019-09-29T04:28:37.389Z",
        "createdAt": "2019-09-29T04:28:37.389Z"
    }
}
```

### **[DELETE]** : `music/:id/like`

```json
# response (id: 1)
{
    "message": "UNLIKE MUSIC!"
}
```

---

## PLAY_LIST

## **[POST]** : /list/add

```json
# body
{
    "listName": "list1"
}
```

```json
# response
{
    "message": "Add a playlist",
    "list": {
        "id": 4,
        "userId": 1,
        "listName": "list1",
        "updatedAt": "2019-09-29T04:40:24.233Z",
        "createdAt": "2019-09-29T04:40:24.233Z"
    }
}
```

### **[GET]** : /list

```json
# response
[
    {
        "id": 1,
        "listName": "list"
    }
]
```

### **[GET]** : /list/:id/music

```json
# response (id: 1)
[
    {
        "id": 1,
        "userId": 1,
        "listName": "list1",
        "createdAt": "2019-09-29T04:35:39.000Z",
        "updatedAt": "2019-09-29T04:35:39.000Z",
        "musics": [
            {
                "id": 1,
                "title": "바람기억",
                "thumbnail": "test01",
                "artist": "나얼",
                "playTime": "05:30",
                "genre": "R&B",
                "MusicPlayList": {
                    "musicId": 1,
                    "playlistId": 1,
                    "createdAt": "2019-09-29T04:36:36.000Z",
                    "updatedAt": "2019-09-29T04:36:36.000Z"
                }
            }
        ]
    }
]
```

### **[DELETE]** : /list/:id

```json
# response (id: 1)
{
    "message": "LIST DELETED!"
}
```

---

## Comment

### **[POST]** : /comment

```json
# body
{
	"comment": "안녕하세요",
	"postId": 1,
	"musicId": 1
}
```
```json
# response
{ 
    "message": "ADD COMMENT SUCCESS!"
}
```

### **[GET]** : /comment

```json
[
    {
        "id": 1,
        "comment": "안녕하세요",
        "commentUsername": "apple",
        "postId": 1,
        "createdAt": "2019-09-30T04:40:52.000Z",
        "users": [
            {
                "email": "apple@apple.com",
                "username": "apple",
                "userImage": null,
                "UserComment": {
                    "userId": 1,
                    "commentId": 1,
                    "createdAt": "2019-09-30T04:40:52.000Z",
                    "updatedAt": "2019-09-30T04:40:52.000Z"
                }
            }
        ],
        "music": {
            "id": 1,
            "title": "바람기억",
            "thumbnail": "image1",
            "artist": "나얼",
            "playTime": "05:30",
            "genre": "ballad",
            "youtubeUrl": null,
            "createdAt": "2019-09-30T04:38:22.000Z",
            "updatedAt": "2019-09-30T04:38:22.000Z"
        }
    }
]
```

### **[DELETE]** : /comment/:id

```json
# response (id: 1)
{
    "message": "DELETE COMMENT SUCCESS!" 
}
```

---

## FOLLOW

### **[POST** : /follow/add

```json
# body
{
	"username": "banana"
}
```

```json
{
    "message": "Follow banana",
    "follow": {
        "id": 1,
        "followerId": 1,
        "followingId": 2,
        "followerName": "apple",
        "followingName": "banana",
        "updatedAt": "2019-09-30T04:58:11.460Z",
        "createdAt": "2019-09-30T04:58:11.460Z"
    }
}
```

### **[GET]** : /follow/following

```json
# response
[
    {
        "id": 1,
        "followingName": "banana"
    }
]
```

### **[GET]** : /follow/follower

```json
# response
[
    {
        "id": 1,
        "followerName": "apple",
        "followingName": "banana"
    }
]
```

### **[DELETE]** : /follow

```json
# body
{
	"username": "banana"
}
```

```json
# response
{
    "message": "Unfollow User banana"
}
```

## Spotify Token

### **[GET]** : /spotify/token

```json
# response
{
    "message": "SUCCESS",
    "token": "*****ACCESS_TOKEN***"
}
```