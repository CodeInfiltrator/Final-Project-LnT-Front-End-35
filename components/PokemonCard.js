import Link from 'next/link';

const PokemonCard = ({ pokemon }) => {
  const pokemonId = pokemon.url.split('/').filter(Boolean).pop();

  return (
    <div className="bg-white bg-opacity-70 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        alt={pokemon.name}
        className="w-full h-32 sm:h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
        <Link href={`/pokemon/${pokemonId}`} legacyBehavior>
          <a className="text-blue-500 hover:text-blue-700 mt-2 inline-block">View Details</a>
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;
