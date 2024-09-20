import { useState } from "react"
import FakeStore from "../fakestore/FakeStore"
import PokeaApi from "../pokeapi/PokeApi"
import Videojuegos from "../videojuegos/Videojuegos"
import './home.css'

const Home = () => {

    const [seccion, setSeccion] = useState("fakestore")

    return (
        <main className="Contenedor">
            <header className="headerHome">
                <nav className="navComponents">
                    <ul className="ulStyle">
                        <li className="liStyle"><button onClick={ () => { setSeccion("fakestore")}}>Tienda</button></li>
                        <li className="liStyle"><button onClick={ () => { setSeccion("pokeapi")}}>Pokemons</button></li>
                        <li className="liStyle"><button onClick={ () => { setSeccion("videojuegos")}}>Videojuegos</button></li>
                    </ul>
                </nav>
            </header>

            <div className="Content">
                {seccion == "fakestore" && <FakeStore/>}
                {seccion == "pokeapi" && <PokeaApi/>}
                {seccion == "videojuegos" && <Videojuegos/>}
            </div>

        </main>
    )
}

export default Home