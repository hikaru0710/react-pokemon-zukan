// src/components/PokemonCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export type PokemonDetail = {
  name: string;
  url: string;
  japaneseName: string;
  number: string;
}

type PokemonCardProps = {
  pokemon: PokemonDetail;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const id = pokemon.url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Link to={`/pokemon/${id}`} className="block hover-lift">
      <div className="pokemon-card group">
        <p className="pokemon-card-number self-start">No. {pokemon.number}</p>
        <img 
          src={imageUrl} 
          alt={pokemon.japaneseName} 
          className="pokemon-card-image group-hover:animate-bounce-slow" 
        />
        <h2 className="pokemon-card-title">{pokemon.japaneseName}</h2>
      </div>
    </Link>
  );
};

export default PokemonCard;

