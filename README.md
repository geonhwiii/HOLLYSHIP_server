# hollyship-server

## copyright by Codestates
---
## INSTALL ORDER

1. Install sequelize-cli globally
```md
# use npm
npm install -g sequelize-cli 
```
```md
# use yarn
yarn global add sequelize-cli
```

2. Install package
```md
# use npm
npm install
```
```md
# use yarn
yarn install
```

3. Create .env file
```
PORT=8000
NODE_ENV=production
COOKIE_SECRET=hollyship_secret
```

4. Create config/config.json file
```json
// config.json
{
  "development": {
    "username": "root",
    "password": "0000",
    "database": "hollyship",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "admin",
    "password": "1q2w3e4r",
    "database": "hollyship",
    "host": "db-hollyship.cv9ff3ss49u5.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql",
    "pool": {
      "maxConnections": 5,
      "maxIdleTime": 30
    }
  }
}

```

5. Start Project
```md
# use npm
npm run build
npm run start
```

```md
# use yarn
yarn build
yarn start
```