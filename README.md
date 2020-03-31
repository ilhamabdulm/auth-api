# auth-api

```
Deploy Server : https://ecommerce-v2.herokuapp.com
```

How to run locally :

```
npm i (server side)
npm run start (server run)
```

## Users Routes

### POST /users/login

---

Login with existing account

> #### Headers :

```
none
```

> #### Request Body :

```
{
    email: <your email goes here>,
    password: <your password here>
}
```

> #### Success Reponse

```
200 : {
    "message": "Please check your email to get your login code",
    "status": 200
}
```

### POST /users/register

---

Register a new account

> #### Headers :

```
none
```

> #### Request Body :

```
{
    name: <your name here>,
    email: <your email goes here>,
    password: <your password here>
}
```

> #### Success Reponse

```
201 : {
    userData : {
        _id: <id>,
        name: <name>,
        email: <email>,
        password: <hashedpassword>
    },
    message: "Registration Success",
    status: 201
}
```

### POST /users/verify/:id

---

Verify login code from email

> #### Headers :

```
none
```

> #### Request Body :

```
{
    code: <otp code from email>
}
```

> #### Success Reponse

```
20o : {
    "message": "Verification success, Logged in",
    "status": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTgzM2JlMDgwOGZjNzYxOTBhNmQ4MzAiLCJlbWFpbCI6ImlsaGFtYWJkdWxtYWxpazIxQGdtYWlsLmNvbSIsImlhdCI6MTU4NTY1OTAyOX0.RdcbENYyK4OVgN9IONo2zKSRUZjU78vMMuzzjy9wpmk"
}
```
### PATCH /users/reset-password

---

Reset user password by email

> #### Headers :

```
none
```

> #### Request Body :

```
{
    email: <your email>
}
```

> #### Success Reponse

```
20o : {
    "message": "Password has been reset, please check your email to get your new Password",
    "status": 200
}
```
