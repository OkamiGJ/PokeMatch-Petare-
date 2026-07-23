import React from "react";
import "./App.css";

// Puedes dejar el componente PokedexHud aquí mismo
function PokedexHud({ childrenLeft, childrenRight }) {
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
                        {childrenLeft || <p>IMAGEN POKEMON</p>}
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
                        <div className="pokemon-name">NombrePokemon</div>
                        <div className="pokemon-descripcion">DescripcionPokemon</div>
                    </div>
                  <div className="botones">
                    <button className="boton smash">SELECT</button>
                    <button className="boton pass">PASS</button>
                  </div>
                </div>
            </div>

            <div className="hinge"></div>{/* Bisagra */}

            <div className="pokedex-derecha">{/* Panel Derecho */}
              <div className="pokedex-derecha-contenido">
                <div className="pantalla-derecha">
                  <button className="menu-btn">Historial</button>
                  <button className="menu-btn">Perfil</button>
                  <button className="menu-btn">Ajustes</button>
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