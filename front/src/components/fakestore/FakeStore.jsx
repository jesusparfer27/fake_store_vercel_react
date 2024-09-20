import { useState, useEffect } from "react"
import Paginacion from "../paginacion/Paginacion"
import './fakestore.css'

const FakeStore = () => {

    const [data, setData] = useState([])
    const [productsPerPage, setProductsPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)

    const { VITE_API_FAKESTORE } = import.meta.env

    const totalProducts = data.length
    const lastIndex = currentPage * productsPerPage
    const firstIndex = lastIndex - productsPerPage

    useEffect(() => {
        let controller = new AbortController()

        const fetchData = async () => {
            try {
                let options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    signal: controller.signal
                }

                const response = await fetch(`${VITE_API_FAKESTORE}`, options)

                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`)
                }

                const fetchedData = await response.json();
                setData(fetchedData)

            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('La solicitud fue abortada');
                } else {
                    console.error('Error en el fetch de productos:', error)
                }
                
            }
        };

        fetchData()

        return () => {
            controller.abort()
        }
    }, [])

    return (
        <div>
            <h1>FakeStore</h1>
            <div className="container-products">
                {data.map((product) => (
                    <div className="card-product" key={product.id}>
                        <figure className="container-img">
                            <img src={product.image} alt={product.title} />
                        </figure>
                        <div className="info-product">
                            <h3>{product.title}</h3>
                            <p className="price">$ {product.price}</p>
                            <button>Añadir al carrito</button>
                        </div>
                    </div>
                )).slice(firstIndex, lastIndex)}
            </div>
            <Paginacion
                productsPerPage={productsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalProducts={totalProducts} />
        </div>
    )
}

export default FakeStore