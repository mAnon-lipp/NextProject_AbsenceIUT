---
trigger: model_decision
description: "À appliquer lorsqu'un changement touche aux déploiements, à la configuration serveur, aux variables d'environnement ou à MySQL sur l'hébergement Vercel."
---

# Déploiement Vercel et variables serveur

- Le dépôt utilise les déploiements Git automatiques de Vercel : un push peut créer un déploiement Preview, et un push sur la branche de production peut déployer en production. Ne jamais pousser, fusionner ou déclencher un déploiement sans demande explicite.
- Les valeurs `DATABASE_URL`, `AUTH_SECRET` et l'URL du flux ICS doivent être configurées comme variables d'environnement Vercel dans chaque environnement nécessaire (Preview et/ou Production). Ne jamais les committer ni les placer dans une configuration versionnée. Les changements de variables nécessitent un nouveau déploiement.
- `app/lib/db.ts` vérifie la présence de `DATABASE_URL` au chargement du module. Vérifier que la variable est disponible pendant le build et au runtime Vercel ; ne pas contourner l'erreur par un comportement de succès sans base.
- Réutiliser le pool `mysql2` existant ; ne pas ouvrir un pool à chaque requête. Les instances serverless peuvent se multiplier : vérifier les limites de connexions, l'accès réseau et TLS auprès du fournisseur MySQL avant toute modification.
- L'ICS reste un accès serveur sans cache persistant (`cache: 'no-store'`) pour chaque demande de page. Garder l'URL et ses identifiants hors du bundle client et des journaux.
- Avant de parler de mise en production, exécuter les vérifications locales disponibles et préciser ce qui n'a pas été vérifié. Distinguer les déploiements Preview de Production.
