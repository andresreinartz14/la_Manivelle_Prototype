# La Manivelle — prototype HEC / UNIL

Recréation du catalogue myTurn de La Manivelle et démonstration des améliorations du parcours de premier emprunt décrites dans le PDF fourni. L’interface est en français et réutilise le logo, les photos et les polices du catalogue d’origine.

## Lancer localement

Node.js 22 ou version plus récente. Aucune installation de dépendances nécessaire.

```sh
npm run dev
```

Ouvrir http://127.0.0.1:4173. Pour un autre port : `PORT=4174 npm run dev`.

```sh
npm run check
```

## Parcours de démonstration

1. Explorer le catalogue sans compte, voir les prix, filtrer par dates, catégorie ou disponibilité et choisir l’antenne de retrait.
2. Ouvrir « Effet lumineux LED Butterfly ». Sélectionner deux dates directement dans le calendrier et ajouter au panier.
3. Ajouter un autre objet avec des dates différentes. Les petits et moyens objets de la sélection peuvent être transférés vers une autre antenne avec deux jours de préparation.
4. Se connecter depuis le panier, ou créer un compte fictif. La page et le panier sont conservés. Les comptes de démonstration avec et sans Pass sont accessibles depuis le bouton `</>` du haut de page.
5. Valider la réservation simulée. Retrouver les objets dans « Mes emprunts » et tester une prolongation si l’objet reste disponible.
6. Dans `</>`, afficher la bannière, générer un bilan mensuel ou un avertissement d’inactivité, puis tester la désactivation du compte. La newsletter exige l’opt-in, modifiable dans « Mon compte ».
7. Réinitialiser la démonstration depuis le même menu.

## Périmètre et données

- Application statique, sans serveur d’authentification, paiement, synchronisation myTurn ou réservation réelle.
- Profils, panier, réservations et messages sont conservés uniquement dans le stockage local du navigateur. Utiliser des données et mots de passe fictifs. Les mots de passe saisis sont dérivés avec PBKDF2 ; cela ne transforme pas la démonstration en authentification de production.
- Les e-mails sont affichés dans une boîte de démonstration, conformément au choix de l’utilisateur. Aucun service d’envoi n’est connecté. Les messages suivent la langue choisie à l’inscription : français, anglais, allemand ou italien.
- Les disponibilités sont fictives ; deux objets ont un emprunt initial simulé. Les réservations créées bloquent ensuite l’objet aux dates choisies dans ce navigateur. Les tarifs sont indicatifs ; le KÄRCHER K5 reprend les 12 CHF du document.
- Un contrôle d’inactivité s’exécute à l’ouverture du prototype : avertissement après 365 jours et suppression 30 jours après l’avertissement. Une reconnexion conserve le compte. Aucun traitement ne tourne lorsque le navigateur est fermé. Les outils de démonstration permettent de déclencher immédiatement les scénarios.
- Le bilan présente les emprunts et les jours de partage réels de la démonstration. Le bilan carbone affiche une simulation explicitement fictive (5 kg par objet emprunté) pour illustrer la proposition du brief. Ce facteur de démonstration ne représente aucune économie réelle ; une méthode et des données d’impact validées seraient nécessaires en production.
- Les règles de réservation appliquent un délai minimum de deux jours, une durée de sept jours maximum et les jours d’ouverture des antennes. Le samedi est réservé à Charmilles ; le dimanche et le lundi sont fermés. Une prolongation unique de sept jours est possible si aucune réservation n’est en conflit.
- Les horaires et adresses proviennent de https://manivelle.ch/nous-trouver/ (consulté le 4 novembre 2026). Le logo redirige vers https://manivelle.ch/.
- Les fichiers à héberger sont dans `dist/`. `.openai/hosting.json` contient l’identité Sites du prototype privé.

## Structure

- `dist/app.mjs` : interface, parcours, profils et messages.
- `dist/domain.mjs` : catalogue, antennes et règles de dates.
- `dist/styles.css` : style myTurn et adaptation mobile.
- `tests/domain.test.mjs` : tests des règles métier de dates et d’inactivité.
- `server.mjs` : serveur statique local sans dépendances.
