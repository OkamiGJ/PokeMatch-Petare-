import React, { useState } from "react";
import "./App.css";
import { pokeData } from "./componentes/pokelist";

const TIPOS_POKEMON = [
    { id: "Bicho", nombre: "Bicho", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/7.png" },
    { id: "Siniestro", nombre: "Siniestro", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/17.png" },
    { id: "Dragón", nombre: "Dragón", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/16.png" },
    { id: "Eléctrico", nombre: "Eléctrico", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/13.png" },
    { id: "Hada", nombre: "Hada", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/18.png" },
    { id: "Lucha", nombre: "Lucha", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/2.png" },
    { id: "Fuego", nombre: "Fuego", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/10.png" },
    { id: "Volador", nombre: "Volador", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/3.png" },
    { id: "Fantasma", nombre: "Fantasma", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/8.png" },
    { id: "Planta", nombre: "Planta", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/12.png" },
    { id: "Tierra", nombre: "Tierra", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/5.png" },
    { id: "Hielo", nombre: "Hielo", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/15.png" },
    { id: "Normal", nombre: "Normal", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/1.png" },
    { id: "Veneno", nombre: "Veneno", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/4.png" },
    { id: "Psíquico", nombre: "Psíquico", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/14.png" },
    { id: "Roca", nombre: "Roca", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/6.png" },
    { id: "Acero", nombre: "Acero", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/9.png" },
    { id: "Agua", nombre: "Agua", icono: "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/types/generation-viii/sword-shield/11.png" },
];

function PokedexHud() {
    const [tiposPermitidos, setTiposPermitidos] = useState(
        TIPOS_POKEMON.map((t) => t.nombre)
    );

    const [disponibles, setDisponibles] = useState(pokeData.map((p) => p.id));
    const [match, setMatch] = useState(() => {
        const randomIndex = Math.floor(Math.random() * pokeData.length);
        return pokeData[randomIndex];
    });

    const toggleTipo = (nombreTipo) => {
        let nuevosTipos;
        if (tiposPermitidos.includes(nombreTipo)) {
            nuevosTipos = tiposPermitidos.filter((t) => t !== nombreTipo);
        } else {
            nuevosTipos = [...tiposPermitidos, nombreTipo];
        }
        setTiposPermitidos(nuevosTipos);
    };

    const obtenerPokemonsFiltrados = (listaIds) => {
        return pokeData.filter(
            (p) =>
                listaIds.includes(p.id) &&
                p.tipo.some((t) => tiposPermitidos.includes(t))
        );
    };

    const nextMatch = () => {
        const pokemonsValidos = obtenerPokemonsFiltrados(disponibles);

        if (pokemonsValidos.length === 0) {
            alert("No hay Pokemons disponibles con los filtros actuales");
            return;
        }

        const restantes = disponibles.filter((id) => id !== match.id);
        const validosRestantes = obtenerPokemonsFiltrados(restantes);

        if (validosRestantes.length === 0) {
            alert("No hay Pokemons Restantes. Reiniciando lista...");
            const todosValidos = obtenerPokemonsFiltrados(pokeData.map((p) => p.id));
            setDisponibles(pokeData.map((p) => p.id));
            setMatch(todosValidos[Math.floor(Math.random() * todosValidos.length)]);
            return;
        }

        const randomPoke = validosRestantes[Math.floor(Math.random() * validosRestantes.length)];
        setMatch(randomPoke);
        setDisponibles(restantes);
    };

    return (
        <div className="pokedex-hud">
            {/* Panel Izquierdo */}
            <div className="pokedex-izquierda">
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
                        {match?.imagen ? (
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
                        <div className="pokemon-name">
                            {match?.nombre || "Cargando..."}
                        </div>
                        <div className="pokemon-descripcion">
                            <div className="visualp1">
                                Nivel: {match?.nivel} | Genero: {match?.genero} | Tipo: {match?.tipo?.join(", ")}
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

            {/* Bisagra */}
            <div className="hinge"></div>

            {/* Panel Derecho */}
            <div className="pokedex-derecha">
                <div className="pokedex-derecha-contenido">
                    <div className="pantalla-derecha">
                        <div className="filtro">
                            {TIPOS_POKEMON.map((tipo) => {
                                const estaPermitido = tiposPermitidos.includes(tipo.nombre);
                                return (
                                    <button
                                        key={tipo.id}
                                        onClick={() => toggleTipo(tipo.nombre)}
                                        className={`logo-tipo ${estaPermitido ? "permitido" : "bloqueado"}`}
                                    >
                                        <img src={tipo.icono} alt={tipo.nombre} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Componente principal
export default function App() {
    return (
        <div className="main-container">
            <PokedexHud />
        </div>
    );
}