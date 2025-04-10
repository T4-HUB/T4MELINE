import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import Frise from "./frise";
import Pioche from "./pioche";
import Leaderboard from "./players";
import { Card, Player } from "../utils/types";
import { loadCards } from "../utils/loadCards";
import { useNavigate } from "react-router";
import "./partie.css";

function Partie() {
  const location = useLocation();
  const navigate = useNavigate();

  const cardFlipRef = useRef(new Audio("/audio/card-flip.mp3"));
  const correctRef = useRef(new Audio("/audio/answer-correct.mp3"));
  const wrongRef = useRef(new Audio("/audio/wrong.mp3"));
  const {
    players,
    numCards: nbCards,
    maxPoints,
  } = location.state || { players: [] };
  console.log("state :", location.state);
  const [playersState, setPlayersState] = useState<Player[]>(players);

  const [pioche, setPioche] = useState<Card[]>([]);
  // État pour la carte sélectionnée
  const [carteSelectionnee, setCarteSelectionnee] = useState<Card | null>(null);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(
    Math.floor(Math.random() * players.length)
  );
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCards() {
      console.log("Nombre de catres à charger :", nbCards);
      const loadedCards = await loadCards(nbCards);
      const randomIndex = Math.floor(Math.random() * loadedCards.length);
      const firstCard = loadedCards[randomIndex];
      const remainingCards = loadedCards.filter(
        (_, index) => index !== randomIndex
      );
      setCartes([firstCard]);
      setPioche(remainingCards);
      console.log("Pioche initialisée avec les cartes :", remainingCards);
    }
    fetchCards();
  }, [nbCards]);

  const [cartes, setCartes] = useState<Card[]>([]);

  function nextPlayer() {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playersState.length);
  }

  function compareDates(date1: string, date2: string): number {
    const value1 = parseSeasonalDate(date1, "start");
    const value2 = parseSeasonalDate(date2, "start");

    if (value1 === null || value2 === null) {
      console.warn(
        `Impossible de comparer les dates : "${date1}" et "${date2}"`
      );
      return 0;
    }

    return value1 - value2;
  }

  function parseSeasonalDate(
    dateStr: string,
    mode: "start" | "average" = "start"
  ): number | null {
    const seasonMap: { [key: string]: number } = {
      printemps: 0.0,
      été: 0.25,
      ete: 0.25,
      automne: 0.5,
      hiver: 0.75,
    };

    const seasons = [
      ...dateStr.toLowerCase().matchAll(/(printemps|été|ete|automne|hiver)/g),
    ];
    const years = [...dateStr.matchAll(/\d{4}/g)].map((match) =>
      parseInt(match[0])
    );

    if (years.length === 0) return null;

    const getDateValue = (index: number): number => {
      const year = years[index];
      const seasonMatch = seasons[index];
      const season = seasonMatch ? seasonMap[seasonMatch[1]] : 0.0;
      return year + season;
    };

    if (mode === "average" && years.length >= 2) {
      const start = getDateValue(0);
      const end = getDateValue(1);
      return (start + end) / 2;
    }

    return getDateValue(0);
  }

  function isChronological(cards: Card[]): boolean {
    console.log("Vérification des cartes :", cards);
    for (let i = 1; i < cards.length; i++) {
      if (
        compareDates(cards[i - 1].date.toString(), cards[i].date.toString()) > 0
      ) {
        return false;
      }
    }
    return true;
  }

  function drawCard() {
    if (carteSelectionnee) {
      return;
    }

    if (pioche.length === 0) {
      return;
    }

    if (pioche.length > nbCards) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * pioche.length);
    const selectedCard = pioche[randomIndex];
    setCarteSelectionnee(selectedCard);

    const audio = cardFlipRef.current;
    audio.currentTime = 0; // Remet à zéro le temps de lecture
    audio.play().catch((error) => {
      console.error("Erreur lors de la lecture du son :", error);
    });

    const newPioche = pioche.filter((_, index) => index !== randomIndex);
    setPioche(newPioche);
  }

  function handleAddCarte(carte: Card, index: number, isBefore: boolean) {
    setCartes((oldCartes) => {
      const newCartes = [...oldCartes];
      const insertionIndex = isBefore ? index : index + 1;
      newCartes.splice(insertionIndex, 0, carte);

      if (!isChronological(newCartes)) {
        const audio = wrongRef.current;
        audio.currentTime = 0; // Remet à zéro le temps de lecture
        audio.play().catch((error) => {
          console.error("Erreur lors de la lecture du son :", error);
        });
        newCartes.sort((a, b) =>
          compareDates(a.date.toString(), b.date.toString())
        );
      } else {
        setPlayersState((prevPlayers) => {
          const updatedPlayers = prevPlayers.map((player, idx) =>
            idx === currentPlayerIndex
              ? { ...player, score: player.score + 1 }
              : player
          );

          // Vérifier la fin de partie après la mise à jour du score
          if (updatedPlayers.some((player) => player.score >= maxPoints)) {
            setIsGameOver(true); // Déclencher la fin de partie
          }

          const audio = correctRef.current;
          audio.currentTime = 0; // Remet à zéro le temps de lecture
          audio.play().catch((error) => {
            console.error("Erreur lors de la lecture du son :", error);
          });

          return updatedPlayers;
        });
      }
      return newCartes;
    });
    setCarteSelectionnee(null);

    if (!isGameOver) {
      nextPlayer();
    }
  }

  useEffect(() => {
    if (isGameOver) {
      navigate("/endgame", { state: { players: playersState } });
    }
  }, [isGameOver, playersState]);

  useEffect(() => {
    if (pioche.length === 0 && carteSelectionnee) {
      setIsGameOver(true);
    }
  }, [pioche, carteSelectionnee]);

  return (
    <div className="partie">
      <div className="pioche">
        {" "}
        <Pioche
          pioche={pioche}
          onDrawCard={drawCard}
          carteSelectionnee={carteSelectionnee}
        />{" "}
      </div>
      <div className="frise-container">
        {" "}
        <Frise
          cartes={cartes}
          onAddCarte={(index, isBefore) =>
            carteSelectionnee &&
            handleAddCarte(carteSelectionnee, index, isBefore)
          }
        />
      </div>
      <div className="leaderboard">
        {" "}
        <h2>Joueur actuel : {playersState[currentPlayerIndex].name}</h2>
        <Leaderboard players={playersState} />{" "}
      </div>
    </div>
  );
}

export default Partie;
