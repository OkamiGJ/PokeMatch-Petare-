import React, { useState } from "react";
import "./App.css";
import { pokeData } from "./componentes/pokelist";

// Puedes dejar el componente PokedexHud aquí mismo
function PokedexHud({ childrenLeft, childrenRight }) {

    const [disponibles, setDisponibles] = useState(pokeData.map((p)=>p.id)); /*paraque no se repitan pokemons*//*miedo en el rancho*/

    const [match, setMatch] = useState(()=>{
        const randomIndex = Math.floor(Math.random() * pokeData.length);    
        return pokeData[randomIndex];
    })/*muestra el match actual*/

    const nextMatch=()=>{
        const restantes=disponibles.filter((id)=> id !== match.id);
        if (restantes.length === 0) {
            alert("¡Has visto a todos los Pokémon! Reiniciando la Pokédex...");
            const nuevaLista = pokeData
                .map((p) => p.id)
                .filter((id) => id !== match.id);
            setDisponibles(nuevaLista);

            const randomId = nuevaLista[Math.floor(Math.random() * nuevaLista.length)];
            setMatch(pokeData.find((p) => p.id === randomId));
            return;
    }

    const randomId = restantes[Math.floor(Math.random() * restantes.length)];
        const siguiente = pokeData.find((p) => p.id === randomId);

        setMatch(siguiente);
        setDisponibles(restantes);
    };

    return (
        <div className="pokedex-hud">

            <div className="pokedex-izquierda">{/* Panel Izquierdo */}

                <div className="borde-superior">
                    <div className="luz-az-G"></div>
                    <div className="luces-p">
                        <span className="luces red"></span>
                        <span className="luces yellow"></span>
                        <span className="luces green"></span>
                    </div>
                </div>


                <div className="panel-central">
                    <div className="screen-content">
                        { match?.imagen ? (
                            <img
                                src={match.imagen}
                                alt={match.nombre}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        ) : (
                            <p>No Imagen</p>
                        )}
                    </div>
                </div>


                <div className="controls">
                    <div className="pill-buttons">
                        <div className="pill yellow"></div>
                        <div className="pill blue"></div>
                    </div>
                </div>

                <div className="panel">
                    <div className="control">
                        <div className="pokemon-name">{match?.nombre || "Cargando..."}
                        </div>
                        <div className="pokemon-descripcion">
                            <div className="visualp1">
                                Nivel:{match?.nivel} | Genero:{match?.genero}
                            </div>
                            <div className="visualp2">
                                {match?.descripcion}
                            </div>
                        </div>
                    </div>

                  <div className="botones">
                    <button className="boton smash" onClick={nextMatch}>
                            SMASH
                        </button>
                        <button className="boton pass" onClick={nextMatch}>
                            PASS
                        </button>
                  </div>
                </div>
            </div>

            <div className="hinge"></div>{/* Bisagra */}

            <div className="pokedex-derecha">{/* Panel Derecho */}
              <div className="pokedex-derecha-contenido">
                <div className="pantalla-derecha">
                  <button className="menu-btn">Historial</button>
                  <button className="menu-btn">Perfil</button>
                </div>
              </div>
            </div>
        </div>
    );
}

// Componente principal de la aplicación
export default function App() {
    return (
        <div className="main-container">
            <PokedexHud />
        </div>
    );
}