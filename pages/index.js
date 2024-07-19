import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import Loader from '../components/Loader';



export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(response => {
        setPokemons(response.data.results);
        setFilteredPokemons(response.data.results);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, pokemons]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="pokemon-theme">
      <header className="w-full h-64 flex justify-center items-center">
        <img src="https://www.pngarts.com/files/3/Pokemon-Logo-Transparent-Image.png" alt="Pokemon Header" className="h-full object-contain"/>
      </header>
      <div className="container mx-auto p-4 mt-8">
        <div className="my-4 flex justify-center">
          <input
            type="text"
            placeholder="Search Pokémon"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredPokemons.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))}
        </div>
        <footer className="bg-blue-500 text-white p-4 text-center mt-4">
          <p>&copy; 2024 Pokémon App by Michael Wijaya & Frizzia Darren</p>
        </footer>
      </div>
    </div>
  );
}
