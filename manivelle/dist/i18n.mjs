import {PRODUCTS} from './domain.mjs';

// Keep catalogue/filter identifiers and visitor-entered text in their original form.
// Only the displayed interface and catalogue copy are translated.
const pairs = `
Aller au contenu|Skip to content
La Manivelle — site principal|La Manivelle — main website
La Manivelle, votre bibliothèque d’objets|La Manivelle, your library of things
Langue du site|Website language
Catalogue|Catalogue
Aide|Help
Panier|Cart
Créer un compte|Create an account
Se connecter|Log in
Mon compte|My account
Mes emprunts|My loans
Se déconnecter|Log out
Pass annuel|Annual Pass
À l’objet|Pay per item
Pass annuel actif|Annual Pass active
Outils de démonstration|Demo tools
Testez les améliorations du parcours.|Try the improved borrowing experience.
Visiteur sans compte|Guest visitor
Compte sans abonnement|Account without a Pass
Compte avec Pass annuel|Account with an annual Pass
Masquer la bannière|Hide the banner
Afficher la bannière|Show the banner
M’envoyer le bilan mensuel|Send myself the monthly summary
Activez la newsletter dans Mon compte.|Enable the newsletter in My account.
Avertir de la désactivation|Send an inactivity warning
Désactiver le compte|Deactivate the account
Voir les e-mails de démonstration|View demo emails
Réinitialiser la démonstration|Reset the demo
Comptes, emprunts et e-mails simulés dans ce navigateur.|Accounts, loans and emails are simulated in this browser.
La Manivelle Genève · Votre bibliothèque d’objets|La Manivelle Genève · Your library of things
Comment emprunter ?|How does borrowing work?
Nos antennes|Our branches
Prototype de recherche HEC · UNIL. Objets, disponibilités et tarifs de démonstration. Aucun paiement ni réservation réelle. Inspiré de|HEC · UNIL research prototype. Demo items, availability and prices. No real payments or reservations. Inspired by
Filtres du catalogue|Catalogue filters
Lieu de collecte|Collection branch
Tous les lieux|All locations
Les petits et moyens objets peuvent être transférés entre antennes.|Small and medium items can be transferred between branches.
Dates de l’emprunt|Loan dates
Choisir mes dates|Choose my dates
Effacer les dates|Clear dates
Jusqu’à 7 jours · 2 jours de préparation|Up to 7 days · 2 days of preparation
Disponibilité|Availability
En stock maintenant|In stock now
Catégories|Categories
Travaux / Bricolage|Tools / DIY
Agrafeuses / Cloueuses|Staplers / Nail guns
Batteries / Chargeurs pour outils électroportatifs|Power-tool batteries / Chargers
Carrelage / Parquet|Tiles / Flooring
Démolition|Demolition
Échelles / Escabeaux|Ladders / Stepladders
Équipement de protection / Vêtements|Protective equipment / Clothing
Établis / Chevalets / Serre-joints|Workbenches / Trestles / Clamps
Outils de mesure / Détecteurs / Niveaux|Measuring tools / Detectors / Levels
Outils manuels|Hand tools
Perceuses / Visseuses / Perforateurs|Drills / Drivers / Hammer drills
Ponceuses / Rabots|Sanders / Planers
Scies / Meuleuses / Outils multifonctions|Saws / Grinders / Multi-tools
Équipements électriques|Electrical equipment
Adaptateurs|Adapters
Multiprises / Rallonges / Enrouleurs|Power strips / Extension cables / Reels
Jardinage|Gardening
Arrosage / Pulvérisation|Watering / Spraying
Outils à main|Hand tools
Outils motorisés|Powered tools
Habitat|Home
Nettoyage / Entretien|Cleaning / Maintenance
Repassage / Vaporisation|Ironing / Steaming
Cuisine|Kitchen
Appareils électriques|Electrical appliances
Fondue / Raclette|Fondue / Raclette
Ustensiles / Vaisselle|Utensils / Tableware
Mobilier|Furniture
Audio-Vidéo / Multimédia|Audio-Video / Multimedia
Photo / Vidéo / Audio|Photography / Video / Audio
Transports / Déménagement|Transport / Moving
Sport / Outdoor|Sport / Outdoors
Camping|Camping
Pique-nique|Picnics
Sports de montagne|Mountain sports
Événements / Fêtes|Events / Parties
Audiovisuel / Sonorisation|Audio-visual / Sound equipment
Lumières / Ambiance|Lighting / Atmosphere
Machines de stands|Event-stall machines
Loisirs / Hobbies|Leisure / Hobbies
Catalogue d’objets|Item catalogue
Rechercher un objet|Search for an item
Rechercher un objet, un projet, une envie…|Search for an item, a project, an idea…
Rechercher|Search
Une idée, un projet… besoin d’un conseil ?|An idea, a project… need some advice?
Venez en parler avec nous dans une antenne La Manivelle.|Come and talk to us at a La Manivelle branch.
Nous rencontrer|Meet us
Fermer la bannière|Close the banner
Objets par page|Items per page
Voir|View
Affichage|Display
Grille|Grid
Liste|List
Trier par|Sort by
Pertinence|Relevance
Nom : A–Z|Name: A–Z
Nom : Z–A|Name: Z–A
Prix croissant|Price: low to high
Réinitialiser|Reset
Page précédente|Previous page
Page suivante|Next page
Pages du catalogue|Catalogue pages
Merci pour votre suggestion !|Thank you for your suggestion!
Vous ne trouvez pas l’objet qu’il vous faut ?|Can’t find the item you need?
Votre demande a été enregistrée dans ce prototype.|Your request has been saved in this prototype.
Pour cette démonstration, elle reste dans ce navigateur. Aucun message réel n’a été envoyé à La Manivelle.|For this demo, it stays in this browser. No real message has been sent to La Manivelle.
Faire une autre suggestion|Suggest another item
Retour au catalogue|Back to the catalogue
Aucun objet ne correspond à votre recherche. Faites-nous part de votre envie pour nous aider à enrichir le catalogue.|No items match your search. Tell us what you would like to borrow to help us expand the catalogue.
Quel objet aimeriez-vous emprunter ?|What would you like to borrow?
Le nom de l’objet, son usage ou un détail qui nous aiderait à le trouver…|The item’s name, intended use or a detail that would help us find it…
Prototype : votre suggestion est enregistrée uniquement dans ce navigateur.|Prototype: your suggestion is saved only in this browser.
Envoyer ma suggestion|Send my suggestion
Modifier ma recherche|Change my search
Disponible à vos dates|Available on your dates
Vérifier la disponibilité|Check availability
Actuellement emprunté|Currently on loan
Inclus dans votre Pass|Included in your Pass
par emprunt · jusqu’à 7 jours|per loan · up to 7 days
Réserver|Reserve
Préparation|Preparation
Préparation · 2 jours|Preparation · 2 days
Un temps de préparation de 2 jours est nécessaire pour vérifier l’objet et l’amener à destination.|Two days of preparation are needed to check the item and bring it to your collection branch.
Votre sélection|Your selection
Disponible|Available
Réservé|Reserved
Mois précédent|Previous month
Mois suivant|Next month
lun.|Mon
mar.|Tue
mer.|Wed
jeu.|Thu
ven.|Fri
sam.|Sat
dim.|Sun
Lundi|Monday
Mardi|Tuesday
Mercredi|Wednesday
Jeudi|Thursday
Vendredi|Friday
Samedi|Saturday
Dimanche|Sunday
Fermé|Closed
Horaires de retrait et de retour|Collection and return hours
Notre équipe est sur place pour vous accueillir et vous conseiller.|Our team is on site to welcome you and offer advice.
Voir les accès et les horaires|View directions and opening hours
Objet introuvable|Item not found
Lieu d’origine|Original branch
Fabricant|Manufacturer
Contenance|Capacity
Taille|Size
Poids|Weight
Capacité|Capacity
Alimentation|Power supply
Utilisation|Use
Inclus|Included
Diamètre|Diameter
Modèle|Model
Emprunt|Loan
Piles|Batteries
En intérieur|Indoors
En extérieur|Outdoors
Câble d’alimentation|Power cable
Flashs et trépieds|Flashes and stands
Manuelle|Manual
Ballons à air|Air-filled balloons
Console, manettes, station|Console, controllers, dock
Batterie|Battery
Coffret et chargeur|Case and charger
Création textile|Textile crafts
Jusqu’à 7 jours|Up to 7 days
Choisissez vos dates|Choose your dates
7 jours maximum|7 days maximum
Cliquez sur le jour du retrait, puis sur le jour du retour.|Click the collection day, then the return day.
Transfert vers cette antenne inclus.|Transfer to this branch is included.
Retrait|Collection
Retour|Return
Choisir une date|Choose a date
Prévoyez 2 jours pour la préparation. Retrait et retour aux jours d’ouverture de l’antenne.|Allow 2 days for preparation. Collect and return items on the branch’s opening days.
Enregistrer les modifications|Save changes
Ajouter au panier|Add to cart
Vous confirmerez votre réservation depuis le panier.|You will confirm your reservation in the cart.
Pas besoin de compte pour préparer votre panier.|No account needed to prepare your cart.
Votre panier est encore vide|Your cart is still empty
Un projet en tête ? Trouvez l’objet qu’il vous faut.|Have a project in mind? Find the item you need.
Parcourir le catalogue|Browse the catalogue
Panier de la réservation|Reservation cart
Continuer à explorer|Keep exploring
Chaque objet a ses propres dates. Modifiez un emprunt sans changer les autres.|Each item has its own dates. Change one loan without changing the others.
Articles en réservation|Reserved items
Modifier les dates / le lieu|Change dates / branch
Supprimer|Remove
Quantité|Quantity
Remarques ou demandes concernant cette réservation|Comments or requests about this reservation
Une question à notre équipe ?|A question for our team?
Retrait et retour dans l’antenne choisie pour chaque objet. Une prolongation de 7 jours peut être demandée si l’objet reste disponible.|Collect and return each item at its chosen branch. You can request a 7-day extension if the item remains available.
Votre réservation|Your reservation
Inclus dans le Pass annuel|Included in the annual Pass
Total|Total
Vos emprunts sont inclus dans votre Pass.|Your loans are included in your Pass.
Tarif par emprunt, jusqu’à 7 jours. Règlement en antenne dans le parcours réel.|Price per loan, up to 7 days. Payment at the branch in the real service.
Votre panier est prêt. Connectez-vous pour confirmer votre réservation.|Your cart is ready. Log in to confirm your reservation.
Valider la réservation|Confirm reservation
Se connecter et réserver|Log in and reserve
Démonstration · aucun paiement réel|Demo · no real payment
Inscription|Registration
Afin de tenir notre base de données à jour, les profils sans activité sur le site après leur inscription seront supprimés après trois mois consécutifs d’inactivité.|To keep our database clean, profiles without any activity on the website after registration will be removed after three consecutive months of inactivity.
Vous devez avoir plus de 18 ans pour créer un compte.|You must be at least 18 years old to create an account.
Retrouvez votre sélection et poursuivez votre réservation.|Find your selection and continue your reservation.
Prototype de démonstration : utilisez des coordonnées et un mot de passe fictifs. Les données restent dans ce navigateur.|Demo prototype: use fictional contact details and a test password. Your data stays in this browser.
Prénom|First name
Nom de famille|Last name
Adresse e-mail|Email address
Nom d’utilisateur|Username
Mot de passe|Password
Retaper votre mot de passe|Repeat your password
Adresse (rue et numéro)|Address (street and number)
Ville|City
Pays|Country
Suisse|Switzerland
Autre|Other
Code postal|Postal code
Téléphone|Phone
Langue|Language
Choisissez le français ou l’anglais.|Choose French or English.
Genre|Gender
Sélectionner|Select
Femme|Woman
Homme|Man
Préfère ne pas répondre|Prefer not to say
Date de naissance|Date of birth
J’ai lu et j’accepte le|I have read and accept the
règlement et les conditions d’utilisation|rules and terms of use
pour cette démonstration.|for this demo.
Je souhaite recevoir la newsletter de La Manivelle par e-mail.|I would like to receive the La Manivelle newsletter by email.
J’accepte d’être contacté(e) par téléphone pour une courte enquête visant à améliorer les services de La Manivelle.|I agree to be contacted by phone for a short survey to help improve La Manivelle’s services.
Ces deux choix sont facultatifs.|Both choices are optional.
Créer mon compte|Create my account
Se connecter et retrouver mon panier|Log in and return to my cart
Déjà un compte ?|Already have an account?
Pas encore de compte ?|Don’t have an account yet?
S’inscrire|Sign up
Essayer le prototype sans inscription|Try the prototype without registering
Retour à ma sélection|Back to my selection
La bibliothèque d’objets à Genève|The library of things in Geneva
Un objet pour votre projet.|An item for your project.
Pas besoin de l’acheter.|No need to buy it.
Découvrez comment préparer votre premier emprunt à La Manivelle.|Find out how to prepare your first loan at La Manivelle.
Explorer le catalogue|Explore the catalogue
1. Trouvez ce qu’il vous faut|1. Find what you need
Explorez le catalogue et consultez les tarifs sans créer de compte. Utilisez la recherche, les catégories et vos dates pour trouver un objet disponible.|Explore the catalogue and check prices without creating an account. Use the search, categories and your dates to find an available item.
2. Choisissez vos dates et votre antenne|2. Choose your dates and branch
Prévoyez un délai de préparation de|Allow a preparation period of
2 jours minimum|at least 2 days
. Un emprunt dure jusqu’à|. A loan lasts up to
7 jours|7 days
. Le retrait et le retour se font du mardi au vendredi, et aussi le samedi à Charmilles (MACO).|. Collection and returns are available Tuesday to Friday, and also on Saturdays at Charmilles (MACO).
Pour les petits et moyens objets du prototype, le transfert vers l’antenne qui vous convient est possible. Chaque objet peut avoir des dates différentes dans votre panier.|Small and medium items in the prototype can be transferred to the branch that suits you. Each item in your cart can have different dates.
3. Préparez votre panier, puis connectez-vous|3. Prepare your cart, then log in
Vous pouvez ajouter des objets sans compte. La connexion ou l’inscription intervient uniquement au moment de confirmer votre réservation. Votre panier et votre page sont conservés.|Add items without an account. You only need to log in or register when confirming your reservation. Your cart and current page are preserved.
4. Venez chercher vos objets|4. Collect your items
Notre équipe est présente en antenne pour vous conseiller. Rapportez chaque objet à l’antenne de retrait à la date convenue.|Our team is at the branch to offer advice. Return each item to its collection branch on the agreed date.
5. Besoin de quelques jours de plus ?|5. Need a few more days?
Depuis « Mes emprunts », demandez une prolongation de 7 jours, sans frais, si l’objet est toujours disponible et que l’antenne est ouverte au retour.|In “My loans”, request a free 7-day extension if the item is still available and the branch is open on the return date.
À l’objet ou avec un Pass ?|Pay per item or use a Pass?
Sans abonnement, vous payez le prix indiqué pour chaque emprunt. Avec un Pass annuel, les emprunts sont inclus. Le menu de démonstration permet de comparer les deux expériences.|Without a Pass, pay the displayed price for each loan. With an annual Pass, loans are included. Use the demo menu to compare both experiences.
Parlons de votre projet|Let’s talk about your project
Besoin d’un conseil pour choisir le bon objet ? Passez nous voir dans l’une de nos cinq antennes.|Need help choosing the right item? Come and see us at one of our five branches.
Voir les antennes|View branches
Ce prototype présente les améliorations proposées par le groupe HEC · UNIL. Il ne crée aucune réservation réelle.|This prototype presents the improvements proposed by the HEC · UNIL group. It does not create real reservations.
Horaires consultés le 4 novembre 2026 sur|Opening hours checked on 4 November 2026 on
le site de La Manivelle|the La Manivelle website
Connectez-vous pour retrouver votre profil.|Log in to view your profile.
Emprunt à l’objet|Pay per item
Compte de démonstration|Demo account
Les informations de ce profil sont enregistrées uniquement dans ce navigateur.|This profile’s information is stored only in this browser.
Mes préférences|My preferences
Recevoir la newsletter et mon bilan mensuel par e-mail.|Receive the newsletter and my monthly summary by email.
Seuls les comptes qui ont donné leur accord reçoivent le bilan mensuel.|Only accounts that have opted in receive the monthly summary.
Enregistrer mes préférences|Save my preferences
Votre formule|Your plan
Vos emprunts sont inclus dans votre Pass annuel.|Your loans are included in your annual Pass.
Vous payez à l’objet, au tarif affiché dans le catalogue.|You pay per item, at the price displayed in the catalogue.
Simuler un compte sans abonnement|Simulate an account without a Pass
Simuler un Pass annuel|Simulate an annual Pass
Changement de démonstration, sans souscription ni paiement.|Demo change, with no subscription or payment.
Connectez-vous pour retrouver vos emprunts.|Log in to view your loans.
Votre premier emprunt vous attend|Your first loan is waiting
Découvrez le catalogue et préparez votre sélection.|Explore the catalogue and prepare your selection.
Confirmée · démonstration|Confirmed · demo
Prolongé de 7 jours|Extended by 7 days
Prolonger de 7 jours|Extend by 7 days
Réservation introuvable|Reservation not found
Votre réservation est confirmée !|Your reservation is confirmed!
Démonstration|Demo
Total de la démonstration|Demo total
Aucune réservation réelle n’a été transmise à La Manivelle.|No real reservation has been sent to La Manivelle.
Voir mes emprunts|View my loans
Quand souhaitez-vous emprunter ?|When would you like to borrow?
Choisissez une date de retrait, puis de retour.|Choose a collection date, then a return date.
Tous les lieux · le samedi, retrait et retour à Charmilles uniquement.|All locations · on Saturdays, collection and returns are available at Charmilles only.
2 jours de préparation · 7 jours maximum. Le lieu se choisit dans les filtres du catalogue.|2 days of preparation · 7 days maximum. Choose the branch in the catalogue filters.
Annuler|Cancel
Afficher les objets disponibles|Show available items
E-mails de démonstration|Demo emails
Prévisualisation immédiate. Aucun e-mail n’est envoyé à une adresse réelle.|Instant preview. No email is sent to a real address.
Votre boîte est vide|Your inbox is empty
Utilisez les outils de démonstration pour générer un bilan mensuel ou un avertissement.|Use the demo tools to generate a monthly summary or an inactivity warning.
De : La Manivelle · Démonstration|From: La Manivelle · Demo
Suggestions d’objets|Item suggestions
Boîte de réception de démonstration. Ces demandes sont enregistrées dans ce navigateur et ne sont pas transmises à La Manivelle.|Demo inbox. These requests are saved in this browser and are not sent to La Manivelle.
Recherche initiale :|Original search:
Aucune suggestion pour le moment|No suggestions yet
Effectuez une recherche sans résultat pour proposer un objet.|Search for an item with no results to suggest it.
Désactiver ce compte de démonstration ?|Deactivate this demo account?
Cette action concerne uniquement le prototype. Le site réel de La Manivelle n’est pas affecté.|This action only affects the prototype. The real La Manivelle website is unaffected.
Recommencer la démonstration ?|Start the demo again?
Les comptes fictifs, le panier, les emprunts, les e-mails et les suggestions d’objets de ce prototype seront effacés dans ce navigateur.|The fictional accounts, cart, loans, emails and item suggestions in this prototype will be cleared from this browser.
Confirmation|Confirmation
Fermer|Close
LA MANIVELLE · VOTRE BILAN|LA MANIVELLE · YOUR SUMMARY
LA MANIVELLE · VOTRE COMPTE|LA MANIVELLE · YOUR ACCOUNT
Conserver mon compte|Keep my account
L’équipe La Manivelle|The La Manivelle team
Emprunter plutôt qu’acheter.|Borrow instead of buying.
Message de démonstration ·|Demo message ·
Newsletter activée avec votre accord. Préférences disponibles dans Mon compte.|Newsletter enabled with your consent. Preferences are available in My account.
Avertissement de service simulé. Aucune suppression sur le site réel.|Simulated service warning. No deletion on the real website.
Connectez-vous pour essayer cette fonction.|Log in to try this feature.
Votre accord à la newsletter est nécessaire. Activez-le dans Mon compte.|Newsletter consent is required. Enable it in My account.
Vous consultez le catalogue sans compte. Votre panier est conservé.|You are browsing as a guest. Your cart is preserved.
Cet objet figure déjà dans votre panier à ces dates.|This item is already in your cart for these dates.
Les dates de cet objet ont été mises à jour.|This item’s dates have been updated.
Deux emprunts du même objet se chevauchent. Modifiez les dates.|Two loans of the same item overlap. Change the dates.
Le compte de démonstration a été supprimé.|The demo account has been deleted.
La démonstration est réinitialisée.|The demo has been reset.
La formule de démonstration a été modifiée.|The demo plan has been changed.
Votre activité est enregistrée. Votre compte est conservé.|Your activity has been recorded. Your account will be kept.
La prolongation n’est pas disponible : l’objet est réservé sur cette période.|An extension is unavailable: the item is reserved during this period.
Votre emprunt est prolongé de 7 jours, sans frais.|Your loan has been extended by 7 days, free of charge.
Les dates ont été effacées : cette antenne est fermée un des jours choisis.|The dates have been cleared: this branch is closed on one of the chosen days.
Choisissez des dates pendant les jours d’ouverture de cette antenne.|Choose dates when this branch is open.
Décrivez l’objet souhaité en au moins 3 caractères.|Describe the item you would like in at least 3 characters.
Votre navigateur n’a pas pu enregistrer cette suggestion. Réessayez après avoir libéré de l’espace.|Your browser could not save this suggestion. Free up some space and try again.
Vos préférences ont été enregistrées.|Your preferences have been saved.
Les mots de passe ne correspondent pas.|The passwords do not match.
Un compte existe déjà avec cette adresse e-mail dans ce prototype.|An account with this email address already exists in this prototype.
Vous devez avoir au moins 18 ans pour créer un compte.|You must be at least 18 years old to create an account.
Adresse e-mail ou mot de passe incorrect. Vous pouvez utiliser un compte de démonstration ci-dessous.|Incorrect email address or password. You can use a demo account below.
Adresse e-mail ou mot de passe incorrect.|Incorrect email address or password.
Choisissez une date de retrait et une date de retour.|Choose a collection date and a return date.
Choisissez une antenne.|Choose a branch.
Prévoyez au moins 2 jours pour préparer votre objet.|Allow at least 2 days to prepare your item.
Le retrait et le retour doivent avoir lieu pendant les jours d’ouverture. Le samedi est possible uniquement à Charmilles (MACO).|Collection and returns must be on opening days. Saturdays are available only at Charmilles (MACO).
Le retour doit avoir lieu après le retrait.|The return date must be after the collection date.
Un emprunt dure au maximum 7 jours.|A loan lasts a maximum of 7 days.
Cet objet est déjà réservé pendant cette période. Choisissez d’autres dates.|This item is already reserved during this period. Choose different dates.
Votre objet|Your item
Le prototype du catalogue La Manivelle Genève. Découvrez les objets, choisissez vos dates et préparez votre premier emprunt.|The La Manivelle Genève catalogue prototype. Discover items, choose your dates and prepare your first loan.
`.trim().split('\n').map(line=>line.split('|'));

export const EN = Object.fromEntries(pairs);
for(const product of PRODUCTS) {
  if(product.nameEn)EN[product.name]=product.nameEn;
  if(product.descriptionEn)EN[product.description]=product.descriptionEn;
}

export function translateText(text,language='fr') {
  if(language!=='en'||!text.trim())return text;
  const key=text.trim().replace(/\s+/g,' ');
  let value=EN[key],match;
  if(value===undefined) {
    if((match=key.match(/^(\d+) résultats?$/)))value=`${match[1]} result${match[1]==='1'?'':'s'}`;
    else if((match=key.match(/^(\d+) jours?$/)))value=`${match[1]} day${match[1]==='1'?'':'s'}`;
    else if((match=key.match(/^(\d+) objets?$/)))value=`${match[1]} item${match[1]==='1'?'':'s'}`;
    else if((match=key.match(/^(\d+–\d+) sur (\d+) objets?$/)))value=`${match[1]} of ${match[2]} item${match[2]==='1'?'':'s'}`;
    else if((match=key.match(/^Panier, (\d+) articles?$/)))value=`Cart, ${match[1]} item${match[1]==='1'?'':'s'}`;
    else if((match=key.match(/^(Suggestions d’objets|Messages de démonstration) \((\d+)\)$/)))value=`${match[1]==='Suggestions d’objets'?'Item suggestions':'Demo messages'} (${match[2]})`;
    else if((match=key.match(/^À : (.+)$/)))value=`To: ${match[1]}`;
    else if((match=key.match(/^Message de démonstration · (.+)$/)))value=`Demo message · ${translateText(match[1],'en')}`;
    else if((match=key.match(/^(\d{2})h(\d{2})–(\d{2})h(\d{2})$/)))value=`${match[1]}:${match[2]}–${match[3]}:${match[4]}`;
    else if((match=key.match(/^Quantité de (.+)$/)))value=`Quantity of ${translateText(match[1],'en')}`;
    else if((match=key.match(/^Voir (.+)$/)))value=`View ${translateText(match[1],'en')}`;
    else if((match=key.match(/^(.+) \((\d+)\)$/))&&EN[match[1]])value=`${EN[match[1]]} (${match[2]})`;
    else if((match=key.match(/^Manivelle → Antenne : (.+)$/)))value=`Manivelle → Branch: ${match[1]}`;
    else if((match=key.match(/^Antenne : (.+)$/)))value=`Branch: ${match[1]}`;
    else if((match=key.match(/^Retrait et retour : (.+)$/)))value=`Collection and return: ${match[1]}`;
    else if((match=key.match(/^Retrait : (.+)$/)))value=`Collection: ${match[1]}`;
    else if((match=key.match(/^(LM-\d+) · Démonstration$/)))value=`${match[1]} · Demo`;
    else if((match=key.match(/^Réservation (LM-\d+)$/)))value=`Reservation ${match[1]}`;
    else if((match=key.match(/^Bienvenue (.+)\. Votre sélection est conservée\.$/)))value=`Welcome ${match[1]}. Your selection is preserved.`;
    else if((match=key.match(/^Tout est prêt pour votre prochain projet, (.+)\.$/)))value=`Everything is ready for your next project, ${match[1]}.`;
    else if((match=key.match(/^Le compte de (.+) et ses données seront supprimés de ce navigateur, comme après un avertissement resté sans réponse pendant 30 jours\.$/)))value=`The account belonging to ${match[1]} and its data will be deleted from this browser, as after a warning left unanswered for 30 days.`;
    else if((match=key.match(/^(.+) a été ajouté au panier\.$/)))value=`${translateText(match[1],'en')} has been added to the cart.`;
    else if((match=key.match(/^(.+) : (.+)$/))&&EN[match[1]])value=`${EN[match[1]]}: ${translateText(match[2],'en')}`;
    else if(key.endsWith(', préparation'))value=key.replace(/, préparation$/,', preparation');
    else if(key.endsWith(', antenne fermée'))value=key.replace(/, antenne fermée$/,', branch closed');
    else if(key.endsWith(', déjà réservé'))value=key.replace(/, déjà réservé$/,', already reserved');
    else if(key.startsWith('La Manivelle Genève · '))value='La Manivelle Genève · '+translateText(key.slice('La Manivelle Genève · '.length),'en');
  }
  return value===undefined?text:text.replace(text.trim(),value);
}

export function localizeDOM(root,language,{preserveEmails=true}={}) {
  if(language!=='en')return;
  const doc=root.ownerDocument||document;
  const excluded='[data-no-translate],textarea,script,style,svg'+(preserveEmails?',.email-paper,.email-list-item strong':'');
  // Native options without an explicit value otherwise change their submitted value with their label.
  for(const option of root.querySelectorAll('option:not([value])'))option.value=option.textContent;
  const walker=doc.createTreeWalker(root,4);
  let node;
  while((node=walker.nextNode()))if(!node.parentElement?.closest(excluded))node.textContent=translateText(node.textContent,language);
  for(const element of root.querySelectorAll('[aria-label],[placeholder],[title],[alt]')) {
    if(element.closest(excluded))continue;
    for(const attribute of ['aria-label','placeholder','title','alt'])if(element.hasAttribute(attribute))element.setAttribute(attribute,translateText(element.getAttribute(attribute),language));
  }
}

export function localizeMarkup(markup,language) {
  if(language!=='en')return markup;
  const template=document.createElement('template');template.innerHTML=markup;
  localizeDOM(template.content,language,{preserveEmails:false});
  return template.innerHTML;
}
