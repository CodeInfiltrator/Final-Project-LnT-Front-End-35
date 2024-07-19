import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// Define a mapping from Pokémon types to colors
const typeColors = {
  grass: 'bg-green-400',
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  bug: 'bg-green-600',
  normal: 'bg-gray-400',
  // Add more types as needed
};

const PokemonDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('bg-gray-200');

  useEffect(() => {
    if (id) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
          const pokemonData = response.data;
          setPokemon(pokemonData);

          // Determine the background color based on the Pokémon's primary type
          if (pokemonData.types && pokemonData.types.length > 0) {
            const primaryType = pokemonData.types[0].type.name;
            setBackgroundColor(typeColors[primaryType] || 'bg-gray-200');
          }
        });
    }
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className={`shadow-lg rounded-lg overflow-hidden p-4 ${backgroundColor}`}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          className="w-48 h-48 mx-auto"
        />
        <h1 className="text-4xl font-bold text-center capitalize">{pokemon.name}</h1>
        <p className="text-center">Height: {pokemon.height}</p>
        <p className="text-center">Weight: {pokemon.weight}</p>
        <p className="text-center">Base Experience: {pokemon.base_experience}</p>
        <h2 className="text-4xl font-bold text-center capitalize mt-10">Moves</h2>
        <ul className="text-center">
          {pokemon.moves.slice(0, 10).map((move, index) => (
            <li key={index} className="text-center capitalize">{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
