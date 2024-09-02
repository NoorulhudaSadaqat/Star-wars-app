import React from "react";
import { Card } from "./characterCard.styles";
import { useSpecies } from "../services/queryService";
import Loader from "../components/loader";

interface CharacterCardProps {
  character: {
    name: string;
    species: string[];
  };
  onClick: () => void;
}

const getSpeciesColor = (classification: string) => {
  switch (classification) {
    case "sentient":
      return "#5D4037"; // Dark Brown
    case "mammal":
      return "#2E8B57"; // Sea Green
    case "artificial":
      return "#4B0082"; // Dark Purple
    case "gastropod":
      return "#8B0000"; // Dark Red
    case "reptile":
      return "#2F4F4F"; // Dark Grey
    case "amphibian":
      return "#00008B"; // Dark Blue
    default:
      return "#000000"; // Default Black for others
  }
};

const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  const speciesUrl = character.species.length > 0 ? character.species[0] : "";
  const { data: speciesData, isLoading, error } = useSpecies(speciesUrl);

  const speciesColor = speciesData
    ? getSpeciesColor(speciesData.classification)
    : "#000000";

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching species data</div>;

  return (
    <Card speciesColor={speciesColor} onClick={onClick} data-testid="card">
      <h3>{character.name}</h3>
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(
          character.name
        )}/200`}
        alt={character.name}
      />
    </Card>
  );
};

export default CharacterCard;
