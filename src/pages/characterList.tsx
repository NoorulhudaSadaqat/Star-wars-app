import React, { useState } from "react";
import { useCharacters } from "../services/queryService";
import CharacterCard from "../components/characterCard";
import CharacterModal from "../components/characterModal";
import Loader from "../components/loader"; // Import the custom loader
import {
  PaginationButton,
  ErrorMessage,
  Container,
} from "./characterList.styles";

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const { data = [], isLoading, error } = useCharacters(currentPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorMessage>Failed to load data. Please try again later.</ErrorMessage>
    );

  return (
    <Container>
      <div className="character-grid" data-testid="character-grid">
        {data.results.map((character: any) => (
          <CharacterCard
            key={character.name}
            character={character}
            onClick={() => setSelectedCharacter(character)}
          />
        ))}
      </div>
      <div className="pagination-controls"  data-testid="pagination-controls">
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </PaginationButton>
        <PaginationButton onClick={handleNextPage}>Next Page</PaginationButton>
      </div>
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </Container>
  );
};

export default HomePage;
