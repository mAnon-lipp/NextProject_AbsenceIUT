---
name: implement-server-feature
description: "Ajoute ou modifie une fonctionnalité, une page, un formulaire, une lecture MySQL ou une mutation dans l'application Next.js AbsenceIUT en respectant l'architecture serveur uniquement."
---

# Implémenter une fonctionnalité serveur

1. Lire `AGENTS.md`, les règles applicables et le code des routes, composants, accès aux données et actions concernés.
2. Pour une API Next.js ou React incertaine, lire la documentation installée dans `node_modules/next/dist/docs/` avant de coder. Vérifier les API en fonction de la version verrouillée.
3. Suivre le flux adapté :
   - Affichage ou lecture : Server Component asynchrone et accès direct à la source via les fonctions de données existantes.
   - Écriture : formulaire HTML et Server Action, avec validation Zod, authentification et autorisation dans l'action, puis revalidation/redirection selon le comportement existant.
   - Flux ICS : récupérer le flux depuis le serveur à chaque accès à la page avec `fetch(..., { cache: 'no-store' })`. Ne pas utiliser de cache persistant ni de revalidation différée ; désactiver le préchargement (`prefetch={false}`) des liens vers cette page si nécessaire pour garantir une récupération au moment de la navigation.
4. Conserver exclusivement des Server Components. Ne pas créer de `"use client"`, de Route Handler, d'API locale ou de requête HTTP vers l'application elle-même.
5. Garder l'URL ICS et ses éventuels identifiants dans une variable d'environnement serveur, jamais dans `NEXT_PUBLIC_*`, les props envoyées au navigateur ou les logs. En cas d'échec du flux, ne pas retourner silencieusement une valeur périmée.
6. Vérifier le schéma et les conventions existantes avant toute requête SQL ; paramétrer chaque valeur. Faire les changements les plus restreints possibles et ne pas modifier de fichiers sans rapport.
7. Vérifier le résultat avec `pnpm exec tsc --noEmit`, puis `pnpm build` si l'environnement le permet. Ne pas prétendre avoir exécuté des scripts `lint` ou `test` : ils ne sont pas définis dans `package.json`.
8. Résumer les fichiers et comportements modifiés, les vérifications réellement exécutées et tout blocage restant.

Si une demande contredit l'architecture imposée ou si le schéma ne permet pas de trancher une décision métier, s'arrêter sur ce point et demander une clarification plutôt que d'introduire un contournement.
