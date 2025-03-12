## Solace Candidate Assignment
At Solace, we aim to match patients with the advocate who is best suited to their needs. To support this goal, we have a table of all of our advocates with some information about them that the patient can search on to find the best match. For this assignment, we have an initial version of this table built in a NextJS application, however it was built by an AI chimpanzee who hadn’t had his latest update yet so it’s full of bugs, bad patterns, and performance pitfalls.

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```
