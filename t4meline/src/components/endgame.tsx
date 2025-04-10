import { useLocation } from "react-router";
import Leaderboard from "./players";
import { useNavigate } from "react-router";
import "./fin.css";

export default function EndGame() {
    const location = useLocation();
    const { players } = location.state || { players: [] };
    const navigate = useNavigate();
    return (
        
        <div className="end-game">
            <h2 className="titre">Fin de partie</h2>
            <Leaderboard players={players} />
            <button
                onClick={() => {
                    navigate("/");
                    window.location.reload(); // Recharger la page pour réinitialiser l'état
                }}
            >
                Rejouer
            </button>
            </div>
        

    )
}