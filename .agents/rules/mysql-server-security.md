---
trigger: glob
globs: "app/lib/**/*.ts, auth.ts, auth.config.ts, proxy.ts"
description: "Sécurité des accès MySQL, Auth.js, Server Actions, validations et données sensibles."
---

# Données et sécurité serveur

- Garder le client MySQL, les secrets et les contrôles d'accès exclusivement côté serveur.
- Réutiliser `app/lib/db.ts` et les conventions des requêtes de `app/lib/data.ts`. Toujours passer les valeurs SQL comme paramètres ; ne jamais interpoler une valeur utilisateur dans une requête.
- Valider les données non fiables avec Zod avant toute lecture ou écriture.
- Vérifier l'authentification et l'autorisation dans chaque Server Action ; la protection par `proxy.ts` ne remplace pas ces vérifications.
- Vérifier les identifiants et relations avec le schéma réellement utilisé avant de changer une requête. Ne pas inventer de colonnes, tables ou statuts.
- Si une URL de flux ICS contient un jeton ou un identifiant privé, la stocker uniquement dans une variable d'environnement serveur ; ne pas la préfixer par `NEXT_PUBLIC_`, l'inclure dans les props ou la journaliser.
- Ne jamais journaliser de mot de passe, jeton, secret ou donnée personnelle inutile. Propager les erreurs de manière explicite sans exposer de détails internes à l'utilisateur.
