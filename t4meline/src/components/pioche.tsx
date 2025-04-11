import "./pioche.css";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "../utils/types";
import { loadCards } from "../utils/loadCards";

export default function Pioche({
  pioche,
  carteSelectionnee,
  onDrawCard,
}: {
  pioche: Card[];
  onDrawCard: (carte: Card) => void;
  carteSelectionnee: Card | null;
}) {
  const audioRef = useRef(new Audio("/audio/card-flip.mp3"));

  return (
    <div className="pioche">
      <div className="pioche-layout">
        <div className="pioche-liste">
          <div
            className="card-back"
            onClick={() => {
              if (pioche.length > 0) {
                onDrawCard(pioche[0]);
              }
            }}
          >
            <p>{pioche.length > 0 ? "Tirer une carte" : "Pioche vide"}</p>
          </div>
        </div>

        <div className="selection">
          <h3>Carte sélectionnée</h3>
          <div className="selected-card">
            {carteSelectionnee ? (
              <div className="carte-title">
                <h2>{carteSelectionnee.titre}</h2>
                <div className="carte-footer">
                  <h2>?</h2>
                </div>
              </div>
            ) : (
              <p>Aucune carte sélectionnée</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
