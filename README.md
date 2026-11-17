## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## MySQL / phpMyAdmin

phpMyAdmin is the administration interface; the application connects to the MySQL server configured behind it.

1. Create or select a MySQL database in phpMyAdmin.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL` with the MySQL host, port, user, password, and database name.
4. Generate `AUTH_SECRET` with `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`.
5. Import the provided schema so that the tables `prof`, `eleve`, `groupe`, `cours`, `cours_groupe`, `absence` and `session` exist.

Example:

```env
DATABASE_URL="mysql://user:password@localhost:3306/absenceiut"
AUTH_SECRET="your-generated-secret"
```

The application authenticates teachers through `prof.email` and `prof.password_hash`.
