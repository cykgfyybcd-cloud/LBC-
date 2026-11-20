# LBC — La Cave Privée

## Lancer l'application
Aucune installation de logiciel : c'est un site statique (HTML, un service worker, un manifeste).

**Essai rapide sur un ordinateur** : dans ce dossier, lancez `python3 -m http.server 8080` puis ouvrez http://localhost:8080.

**Sur l'iPad (installation PWA)** : l'application doit être servie en HTTPS.
1. Mettez les 9 fichiers sur un hébergement statique gratuit. Depuis l'iPad, le plus simple est GitHub Pages : compte gratuit sur github.com, « New repository » (public), « Add file > Upload files », sélectionnez les 9 fichiers (tous au même niveau, sans dossier), « Commit ». Puis Settings > Pages > Branch main > Save. L'adresse apparaît au bout d'une minute (utilisateur.github.io/nom). Sur ordinateur : Netlify Drop (glisser-déposer le dossier).
2. Ouvrez l'adresse obtenue dans **Safari** sur l'iPad.
3. Touchez **Partager**, puis **Sur l'écran d'accueil**, puis **Ajouter**.
4. L'icône LBC ouvre l'application en plein écran, en paysage, y compris hors ligne après un premier chargement.

## Vos données
- Stockées sur l'iPad (IndexedDB, photos comprises) ; stockage persistant demandé au navigateur.
- **Réglages > Exporter la sauvegarde (JSON)** : à faire régulièrement. Effacer les données de Safari supprime la cave.
- Import / export CSV de l'inventaire, import de cotations (colonnes : domaine, cuvee, millesime, type, valeur, date, source).
- Remplacez la démonstration : Réglages > Supprimer les exemples fictifs, puis ajoutez vos bouteilles ou importez un CSV.

## Sommelier IA sans clé dans le navigateur
Sans configuration, le sommelier utilise un moteur local qui répond à partir de votre cave. Pour brancher Claude :
1. Créez un Worker Cloudflare avec `worker.js`.
2. Ajoutez le secret `ANTHROPIC_API_KEY` et `ALLOWED_ORIGIN` (l'adresse de votre application).
3. Renseignez l'URL du Worker dans `config.js` (`AI_ENDPOINT`).
La clé ne quitte jamais le serveur. La lecture d'étiquette par photo passe par le même principe (à ajouter dans le Worker) ; sans service, saisissez les champs à la main.

## Limites à connaître
- Aucune cotation en temps réel : les valeurs sont saisies ou importées, avec date et source.
- Les fenêtres de garde sont des estimations que vous renseignez ; les accords et le service sont des repères généraux.
- Le Studio exporte des images PNG (1080 × 1350 et 1080 × 1920) : maintenez l'image pour l'enregistrer dans Photos. Aucune publication automatique.
