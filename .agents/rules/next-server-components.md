---
trigger: glob
globs: "app/**/*.ts, app/**/*.tsx"
description: "Architecture Next.js App Router : Server Components uniquement, accès direct aux données et mutations avec Server Actions."
---

# Architecture Next.js côté serveur

- Les pages, layouts et composants restent des Server Components. Ne pas ajouter `"use client"`, de hooks React client, d'événements DOM ou d'API navigateur.
- Les lectures de données se font directement depuis la source dans les composants serveur, en réutilisant `app/lib/data.ts` et `app/lib/db.ts`. Ne pas appeler un endpoint de l'application.
- Pour un flux ICS externe, faire une requête serveur avec `fetch(url, { cache: 'no-store' })` à chaque rendu de page qui en dépend. Ne pas mettre le résultat en cache entre requêtes, ne pas lui appliquer de revalidation différée et ne pas le prérendre statiquement.
- Si la page ICS est atteinte par des liens Next.js, vérifier le comportement de préchargement et utiliser `prefetch={false}` sur les liens concernés si le préchargement risque de servir un résultat récupéré avant la navigation.
- Les écritures passent par les Server Actions de `app/lib/actions.ts` et des formulaires HTML avec `action`.
- Ne pas créer de Route Handler, `route.ts`, dossier `app/api/` ou endpoint HTTP local.
- Consulter d'abord le guide pertinent de `node_modules/next/dist/docs/` : le dépôt résout Next.js 16.4.6.
- Si une exigence semble impossible sans composant client ou endpoint local, ne pas contourner ces contraintes : expliquer le blocage et demander une décision.
