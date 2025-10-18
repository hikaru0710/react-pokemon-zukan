// src/components/pokemonTypeLabel.tsx
// ポケモンのタイプのラベル
import { pokemonTypesMap } from '../pokemonTypesMap.ts';

type PokemonTypeLabelProps = {
  type: string;
};

const PokemonTypeLabel: React.FC<PokemonTypeLabelProps> = ({ type }) => {
  const typeInfo = pokemonTypesMap.find((t) => t.jaType === type);
  return (
    <span 
      style={{
        backgroundColor: typeInfo?.color,
      }}
      key={type}
      className="pokemon-type-badge hover:scale-110 transform transition-all duration-200"
    >
      {typeInfo?.jaType}
    </span>
  );
};

export default PokemonTypeLabel;
