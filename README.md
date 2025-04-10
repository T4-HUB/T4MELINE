# T4MELINE

## **FriseServicePublic**

T4MELINE est une application web proposant un jeu de construction d'une frise historique des services publics à l'aide de cartes. Ce jeu éducatif et ludique permet aux joueurs de placer des événements dans leur ordre chronologique tout en apprenant sur les services publics.

---

## **1. Description du jeu**

### **Matériel :**
- Un jeu de cartes, chaque carte contenant :
  - Un titre  
  - Un type  
  - Un service public  
  - Une description  
  - Une date  
- Deux zones principales :
  - Une **pioche centrale** pour tirer des cartes.
  - Une **frise chronologique** où les cartes sont placées dans leur ordre et leur date est affichée.

### **Paramètres de la partie :**
- Nombre de joueurs  
- Nombre maximum de cartes pouvant être présentes dans la pioche  
- Nombre de points à atteindre pour gagner

### **Déroulement de la partie :**
1. Une carte est tirée au sort et posée dans la frise centrale comme point de départ.  
2. Chaque joueur, à tour de rôle :
   - Pioche une carte décrivant une étape historique (sans voir sa date).
   - Dispose cette carte dans la frise centrale (à gauche, à droite ou entre deux cartes déjà posées).
   - Si la carte est bien placée (chronologie respectée), le joueur marque un point.
   - Sinon, la carte est déplacée automatiquement à la bonne place et le joueur ne marque pas de point.
3. La partie se termine lorsqu’un joueur atteint le nombre de points requis ou que la pioche est vide.

---

## **2. Fonctionnalités principales**

### **Menu principal :**
- **Ajout et suppression des joueurs :**
  - Les joueurs peuvent être ajoutés ou supprimés avant de commencer la partie.
- **Paramètres de la partie :**
  - Configuration du nombre de points nécessaires pour gagner.
  - Définition du nombre de cartes dans la pioche.
- **Lancement de la partie :**
  - Un bouton "Play" permet de démarrer la partie.

### **Pendant la partie :**

#### **a. Pioche :**
- Une pioche centrale contenant des cartes face cachée.
- Les joueurs peuvent tirer une carte en cliquant sur la pioche.

#### **b. Frise chronologique :**
- Une frise centrale où les joueurs peuvent placer les cartes tirées.
- Les cartes peuvent être placées à gauche, à droite ou entre deux cartes existantes.
- Vérification automatique de l’ordre chronologique des cartes :
  - Si la carte est bien placée, le joueur marque un point.
  - Sinon, la carte est repositionnée automatiquement.

#### **c. Leaderboard :**
- Affichage des scores des joueurs en temps réel.
- Classement des joueurs par ordre décroissant des scores.

### **Fin de partie :**
- La partie se termine lorsqu’un joueur atteint le score requis ou si la pioche est vide.
- Affichage du leaderboard.
- Possibilité de rejouer.

---

## **3. Interface Utilisateur (UI)**

### **Composants principaux :**
- **Leaderboard :**
  - Tableau ou liste des joueurs avec leurs scores actuels.
  - Mise à jour en temps réel après chaque tour.
- **Frise chronologique :**
  - Composant dynamique où les cartes peuvent être ajoutées et automatiquement réorganisées.
- **Pioche :**
  - Composant interactif permettant aux joueurs de tirer une carte.

---

## **4. Source des données**

Les cartes sont chargées dynamiquement depuis un fichier CSV hébergé en ligne.  
**Lien vers le CSV :**  
[https://docs.google.com/spreadsheets/d/e/2PACX-1vQlzxMUajqLjmCZ_I-NAie0g-ZxTsJqjOnj6R-w139EnpG-XY3DTJ4Hg5iTtzgnfQmSxJnhu0Tl502b/pub?gid=1517720865&single=true&output=csv](https://docs.google.com/spreadsheets/d/e/2PACX-1vQlzxMUajqLjmCZ_I-NAie0g-ZxTsJqjOnj6R-w139EnpG-XY3DTJ4Hg5iTtzgnfQmSxJnhu0Tl502b/pub?gid=1517720865&single=true&output=csv)

---

## **5. Contraintes techniques**

- **Technologies utilisées :**
  - **React** pour le frontend.
  - **TypeScript** pour la gestion des types.
- **Chargement des données :**
  - Les cartes sont chargées dynamiquement depuis un fichier CSV au lancement de l'application.
- **Multijoueur local :**
  - Le jeu est conçu pour être joué sur un même appareil.
- **Compatibilité :**
  - L'application doit être responsive et fonctionner sur ordinateur, tablette, téléphone, etc.

---

## **6. Déroulé d'une partie**

1. Les joueurs configurent la partie dans le menu principal.  
2. Une carte est tirée au hasard pour démarrer la frise.  
3. Chaque joueur, à tour de rôle, tire une carte et la place dans la frise.  
4. Les scores sont mis à jour en temps réel.  
5. La partie se termine lorsqu’un joueur atteint le score requis ou si la pioche est vide.

---

## **7. Fin de partie**

- Un récapitulatif des scores est affiché sous forme de tableau.  
- Les joueurs peuvent relancer une partie.

---

## **8. Procédures d'installation et exécution**

- Lien vers notre jeu : [https://t4-hub.github.io/T4MELINE/](https://t4-hub.github.io/T4MELINE/)

---

## **9. Fonctionnalité avancée**

- Permettre le multijoueur en ligne sur plusieurs machines (utilisation de socket.io).
