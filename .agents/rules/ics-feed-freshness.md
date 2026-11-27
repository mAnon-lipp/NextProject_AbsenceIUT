---
trigger: model_decision
description: "À appliquer dès qu'une page, un composant serveur ou une fonction de données lit un flux ICS/iCalendar externe ; garantir une nouvelle récupération à chaque accès sans exposer son URL."
---

# Fraîcheur et confidentialité des flux ICS

- Récupérer le flux depuis un Server Component ou une fonction de données côté serveur. Ne pas créer d'API locale pour le proxy ni envoyer l'URL au navigateur.
- À chaque requête de rendu de la page concernée, utiliser `fetch(icsUrl, { cache: 'no-store' })`. Ne pas utiliser `force-cache`, `use cache`, `unstable_cache`, une revalidation positive, un stockage mémoire inter-requêtes ou un rendu statique pour le résultat ICS.
- Une déduplication pendant un même rendu serveur est acceptable ; elle ne doit pas conserver le résultat pour les accès suivants.
- Les liens Next.js menant à une page dont le contenu ICS doit être actualisé à la navigation doivent avoir `prefetch={false}` si le préchargement pourrait fournir une réponse RSC obtenue avant le clic. Vérifier le comportement avec la documentation locale de Next.js.
- Garder l'URL du flux et ses éventuels jetons dans une variable d'environnement serveur non préfixée par `NEXT_PUBLIC_`. Ne jamais exposer ou journaliser l'URL ou les secrets.
- Vérifier le statut HTTP et traiter explicitement les erreurs réseau ou de parsing. Ne pas afficher silencieusement une ancienne copie lorsqu'une récupération demandée échoue.

Avant toute modification, consulter la documentation installée de Next.js 16 sous `node_modules/next/dist/docs/`, notamment celle sur `fetch`, le cache et le préchargement des liens.
