# Tweet-ulator

## Demo
https://tweet-tulator-woad.vercel.app/

## Setup Local

- Create `.env` and copy the content from `.env.example`
- Create `serve/.env` and copy the content from `server/.env.example`
- Run `docker-compose up` (You may need run `sudo chown -R 1001 ./docker/mongodb/` if using Ubuntu)
- Visit http://localhost:5000

## Server Architecture

```
+-- server - Server API codebase
|   +-- src
|   |  +-- api/v1 - handler http resquest and response
|   |  +-- constants - defines contansts
|   |  +-- handlers - handle business logic, connect with stores.
|   |  |  +-- interfaces - defines handler interfaces
|   |  +-- models - defines model schema, rules and connect with database
|   |  |  +-- interfaces - defines model interfaces
|   |  +-- stores - handle query functions via models
|   |  |  +-- interfaces - defines store interfaces
|   |  +-- utils - defines helper methods
|   +-- package.json
|   +-- yarn.lock
|   +-- .env.example
|   +-- tsconfig.json
|   +-- tslint.json
```

Notes:
- Deployed the app to Vercel and deploy `server` as serverless functions API.
- Only handle integer with + - * / operators
- When you sign in, if username exists in database, the system will be compare the password, if username doesn't exist, the system will create new user.