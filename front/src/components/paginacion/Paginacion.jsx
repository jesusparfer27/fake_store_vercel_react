import './paginacion.css';

const Paginacion = ({ productsPerPage, totalProducts, currentPage, setCurrentPage }) => {
    const pageNumbers = [];

    try {
        if (productsPerPage <= 0 || totalProducts < 0) {
            throw new Error("El número de productos por página o el total de productos no es válido");
        }

        for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
            pageNumbers.push(i);
        }

        if (pageNumbers.length === 0) {
            throw new Error("No se encontraron páginas para mostrar");
        }
    } catch (error) {
        console.error("Error al generar los números de página:", error);
    }

    const onPreviusPage = () => {
        try {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                console.warn("No se puede retroceder más allá de la primera página");
            }
        } catch (error) {
            console.error("Error al ir a la página anterior:", error);
        }
    };

    const onNextPage = () => {
        try {
            if (currentPage < pageNumbers.length) {
                setCurrentPage(currentPage + 1);
            } else {
                console.warn("No se puede avanzar más allá de la última página");
            }
        } catch (error) {
            console.error("Error al ir a la página siguiente:", error);
        }
    };

    const onSpecificPage = (n) => {
        try {
            if (n >= 1 && n <= pageNumbers.length) {
                setCurrentPage(n);
            } else {
                throw new Error(`El número de página ${n} está fuera del rango permitido`);
            }
        } catch (error) {
            console.error("Error al ir a una página específica:", error);
        }
    };

    return (
        <>
            <nav className="pagination is-centered mb-6" role="navigation" aria-label="pagination">
                <a
                    className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''} black-text`}
                    onClick={onPreviusPage}
                >
                    Anterior
                </a>
                <a
                    className={`pagination-next ${currentPage >= pageNumbers.length ? 'is-disabled' : ''} black-text`}
                    onClick={onNextPage}
                >
                    Siguiente
                </a>
                <ul className="pagination-list">
                    {pageNumbers.map(noPage => (
                        <li key={noPage}>
                            <a
                                className={`pagination-link ${noPage === currentPage ? 'is-current' : ''} black-text`}
                                onClick={() => onSpecificPage(noPage)}
                            >
                                {noPage}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Paginacion;
