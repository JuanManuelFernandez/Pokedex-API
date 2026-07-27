import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [peso, setPeso] = useState('')

  const traduccionesTipos = {
    electric: 'Eléctrico',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    dark: 'Siniestro',
    fairy: 'Hada',
    normal: 'Normal',
    fighting: 'Lucha',
    flying: 'Volador',
    poison: 'Veneno',
    ground: 'Tierra',
    rock: 'Roca',
    bug: 'Bicho',
    ghost: 'Fantasma',
    steel: 'Acero'
  }

  const buscar = async() => {
    try{
      setCargando(true)
      setError(null)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase()}`)
      const data = await res.json()
      console.log(data)
      convertirPeso(data)
      setPokemon(data)
    }
    catch {
      console.log("Error en la busqueda")
    }
    setCargando(false)
  }

  function convertirPeso(pesoPokemon) {
    const pesoConvertido = pesoPokemon.weight/10
    setPeso(pesoConvertido)
  }

  function obtenerTipos(pokemon) {
    if (!pokemon?.types) return ''
    return pokemon.types
      .map(t => traduccionesTipos[t.type.name] ?? t.type.name)
      .join(', ')
  }

  function obtenerHabilidades(pokemon) {
    if (!pokemon?.abilities) return ''
    return pokemon.abilities
      .map(a => a.ability.name)
      .join(', ')
  }

  return (
    <>
      <section className='ContenedorMain'>
        <div className='ContenedorPokedex'>
          <img src='src/assets/pokedex.png' className='Pokedex'></img>

          
          <div className='ContenedorPokemon'>
            <div className='ContenedorImg'>
              <img className='ImgPokemon' src={pokemon?.sprites?.front_default ?? ''} alt={pokemon?.name ?? ''}></img>
            </div>
            <div className='ContenedorBuscadorYDatos'>
              <div className='ContenedorBuscador'>
                <input className='Buscador' value={busqueda} onChange={(e) => setBusqueda(e.target.value)}></input>
                <button className='BtnBuscar' onClick={buscar}><img className='BtnBuscarImg' src='src/assets/Lupa.png'></img></button>
              </div>
              <div className='ContenedorDatos'>
                <span>Altura: {pokemon?.height ?? ''}</span>
                <span>Peso: {peso}</span>
                <span>Tipo: {obtenerTipos(pokemon)}</span>
                <span>Habilidades: {obtenerHabilidades(pokemon)}</span>
              </div>
            </div>
          </div>
        </div>
      </section> 
    </>
  )
}

export default App
