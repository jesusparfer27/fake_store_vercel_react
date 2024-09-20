import { useState, useEffect } from 'react'
import './pokeapi.css'

const PokeaApi = () => {

    const [data, setData] = useState(null); // Cambiado a 'null' porque inicialmente no hay datos
    const [pokemonId, setPokemonId] = useState(1); // Usar pokemonId en lugar de id

    const { VITE_API_POKEMON } = import.meta.env

    console.log(VITE_API_POKEMON)


    const getData = async (id) => { // Añadido el parámetro 'id'
        try {
            const response = await fetch(`${VITE_API_POKEMON}${id}`); // Ahora usa el id correcto
            if (!response.ok) {
                throw new Error('La respuesta fue errónea');
            }
            const data = await response.json();
            setData(data); // Actualiza el estado con los datos obtenidos
        } catch (error) {
            console.error('Error en el fetch de data:', error);
        }
    };

    useEffect(() => {
        getData(pokemonId); // Pasa pokemonId como argumento a getData
    }, [pokemonId]);

    const handleNext = () => {
        setPokemonId(prevId => (prevId < 898 ? prevId + 1 : prevId)); // Limitar al número máximo de Pokémon
    };

    const handleBefore = () => {
        setPokemonId(prevId => (prevId < 898 ? prevId - 1 : prevId)); // Limitar al número máximo de Pokémon
    };

    return (
        <>
            <div className='Pokemon'>
                <img className="LogoPokemon"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
                    alt="Logo Pokémon"
                />
                {data && (
                    <>
                        <div className="pokemonContainer">
                            <h2 className='h2Text'>{data.name}</h2>
                            {data.sprites && (
                                <div className='pokemonContainerImg'>
                                    <img className='Pokemon-img' src={data.sprites.front_default} alt="delante" />
                                    <img className='Pokemon-img' src={data.sprites.back_default} alt="atrás" />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className="pokemonsDiv">
                <button className='buttonNext' onClick={handleBefore}>Pokémon Anterior</button>
                <button className='buttonNext' onClick={handleNext}>Siguiente Pokémon</button>
            </div>
        </>
    )
}

export default PokeaApi;
