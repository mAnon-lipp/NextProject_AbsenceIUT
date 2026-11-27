# Instructions Copilot — AbsenceIUT

Consulter `AGENTS.md` avant toute modification : il est la source de vérité pour l'architecture et les commandes du projet.

- Projet Next.js App Router (Next.js 16.4.6 dans le lockfile), TypeScript, Auth.js et MySQL via `mysql2`.
- Utiliser exclusivement des Server Components : pas de `"use client"` ni de logique client.
- Ne créer aucune API locale, Route Handler ou `app/api/`. Lire depuis MySQL directement côté serveur ; pour les mutations utiliser les Server Actions et les formulaires HTML existants.
- Les données lues depuis un flux ICS externe doivent être récupérées à chaque accès à la page : `fetch` serveur avec `cache: 'no-store'`, sans cache persistant ni revalidation différée. Désactiver le préchargement des liens concernés avec `prefetch={false}` si nécessaire pour garantir une nouvelle requête à la navigation.
- Garder l'URL ICS dans une variable d'environnement serveur, jamais dans `NEXT_PUBLIC_*`, dans le code ou dans les logs ; ne pas exposer l'URL ni les identifiants du flux au navigateur.
- Hébergement Vercel avec déploiements Git automatiques : ne jamais pousser sans demande explicite. Configurer `DATABASE_URL`, `AUTH_SECRET` et l'URL ICS dans les variables Vercel des environnements requis ; les changements de variables ne s'appliquent qu'aux nouveaux déploiements.
- Réutiliser le pool `mysql2` existant de `app/lib/db.ts`. Tenir compte du build Vercel et des limites de connexions de la base lorsque l'on touche aux accès MySQL.
- Valider les entrées avec Zod, vérifier authentification et autorisation dans chaque action, et paramétrer les requêtes SQL.
- Avant tout changement Next.js, lire le guide pertinent dans `node_modules/next/dist/docs/`.
- Vérifier avec `pnpm exec tsc --noEmit` et/ou `pnpm build`. Il n'existe pas actuellement de scripts `lint` ou `test`.
