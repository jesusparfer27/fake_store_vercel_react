import Paginacion from "../paginacion/Paginacion"
import { useState, useEffect } from "react"

const Videojuegos = () => {

    const [data, setData] = useState([])

    const totalProducts = data.length

    const [productsPerPage, setProductsPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)

    const lastIndex = currentPage * productsPerPage
    const firstIndex = lastIndex - productsPerPage

    const getData = async () => {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=3b3d36f059d14aa99642f5fa40e8aea3`);
            if (!response.ok) {
                throw new Error('La respuesta fue erronea')
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error en el fetch de data:', error)
            throw error

        }
    };

    

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            try {
                const gamesData = await getData(controller.signal);
                setData(gamesData)
            } catch (error) {
                console.error('Error al obtener al Pokémon', error)
            } finally {
                controller.abort()
            }
        };
        fetchData();
        return () => controller.abort()
    }, [])

    return (
        <div>
            <h1>VideoGames</h1>
            <div className="container-products">
                {data.slice(firstIndex, lastIndex).map((results) => (
                    <div className="card-product" key={results.id}>
                        <figure className="container-img">
                            <img src={results.background_image} alt={results.name} />
                        </figure>
                        <div className="info-product">
                            <h3>{results.name}</h3>
                            <h3>{ }</h3>
                        </div>
                    </div>
                ))}
            </div>
            <Paginacion
                productsPerPage={productsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalProducts={totalProducts} />
        </div>
    )
}

export default Videojuegos