<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


UTILISER UNIQUEMENT DES COMPOSANTS SERVER PAS DAPI LOCALE

# AbsenceIUT — consignes du projet

Application de gestion des absences construite avec Next.js App Router, React, TypeScript, Tailwind CSS, Auth.js et MySQL (`mysql2`). La version Next.js résolue dans `pnpm-lock.yaml` est 16.4.6.

## Architecture

- `app/` contient les routes, layouts et composants d'interface.
- `app/lib/data.ts` lit les données directement depuis MySQL via `app/lib/db.ts`.
- `app/lib/actions.ts` contient les mutations sous forme de Server Actions.
- `auth.ts` configure Auth.js et l'authentification des enseignants ; `proxy.ts` protège les routes.
- Certaines données de calendrier proviennent d'un flux ICS externe ; elles doivent être récupérées à nouveau à chaque accès à la page qui les affiche.
- Le domaine métier est celui des absences, étudiants, groupes, cours et enseignants. Ne pas reprendre les concepts « invoices/customers » du modèle de démonstration sans vérifier leur équivalent métier.

## Contraintes non négociables

- Utiliser exclusivement des Server Components. Ne pas ajouter `"use client"`, de composant client, de hook React côté client, ni de dépendance à `window`, `document` ou au stockage du navigateur.
- Ne créer aucune API locale : pas de `app/api/`, de Route Handler `route.ts`, d'endpoint REST interne ni d'appel HTTP vers l'application elle-même. Lire les données directement depuis leur source dans les Server Components.
- Pour les données ICS, appeler la source externe depuis le serveur à chaque requête de page avec `fetch(..., { cache: 'no-store' })`. Ne pas utiliser de cache persistant, de durée de revalidation ou de génération statique pour ces données. Si une navigation par lien risque de réutiliser un résultat préchargé, désactiver son préchargement avec `prefetch={false}` après vérification de la documentation Next.js installée.
- Pour les écritures, utiliser une Server Action existante ou en ajouter une dans `app/lib/actions.ts`, appelée par un formulaire HTML via `action`. Ne pas remplacer cette architecture par une API locale.
- Toute Server Action vérifie l'authentification et l'autorisation, valide les entrées avec Zod et utilise des requêtes MySQL paramétrées. Ne jamais faire confiance aux valeurs du formulaire ou à un identifiant fourni par le client.
- Garder l'accès à la base, les secrets et la logique d'authentification côté serveur. Ne jamais ajouter de secret dans le dépôt ou dans un fichier de configuration d'agent versionné.
- Traiter l'URL ICS comme une donnée potentiellement secrète : la lire depuis une variable d'environnement serveur, jamais depuis `NEXT_PUBLIC_*`, ne pas la transmettre aux composants client et ne pas la journaliser. En cas d'échec du flux, ne pas masquer l'erreur en servant silencieusement une ancienne copie.
- Respecter le schéma MySQL existant ; ne pas inventer de table ou de colonne. Vérifier les définitions et requêtes existantes avant de modifier le modèle de données.
- Préserver les erreurs utiles, les types stricts et le périmètre demandé. Ne pas masquer les erreurs par des valeurs de repli silencieuses.

## Documentation Next.js

Avant d'utiliser ou modifier une API Next.js, consulter la documentation installée correspondant au projet sous `node_modules/next/dist/docs/`. La documentation en ligne ou les connaissances du modèle ne remplacent pas cette version locale. Context7 peut compléter cette vérification pour les bibliothèques et leur version exacte.

## Commandes

- Installer : `pnpm install`
- Développement : `pnpm dev`
- Vérifier TypeScript : `pnpm exec tsc --noEmit`
- Build de production : `pnpm build`
- Démarrer le build : `pnpm start`

Le projet ne définit actuellement pas de scripts dédiés `lint` ou `test`. Ne pas annoncer leur exécution ; lancer au minimum le contrôle TypeScript et, si l'environnement le permet, le build pertinent pour le changement.

Ne pas créer de commit ni pousser de branche sans demande explicite.
