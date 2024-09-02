import React from "react";
import { useHomeworld } from "../services/queryService";
import Loader from "./loader";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Button,
  DetailsContainer,
} from "./characterModal.styles";

interface CharacterModalProps {
  character: {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    films: string[];
    homeworld: string;
    created: string;
  };
  onClose: () => void;
}

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB"); // Format as dd-MM-yyyy
};

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
}) => {
  // Fetch homeworld data using React Query
  const { data: homeworld, isLoading: isHomeworldLoading } = useHomeworld(
    character.homeworld
  );

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>{character.name}</h2>
        <DetailsContainer>
          <p>
            <strong>Height:</strong> {Number(character.height) / 100} m
          </p>
          <p>
            <strong>Mass:</strong> {character.mass} kg
          </p>
          <p>
            <strong>Birth Year:</strong> {character.birth_year}
          </p>
          <p>
            <strong>Number of Films:</strong> {character.films.length}
          </p>
          <p>
            <strong>Date Added:</strong> {formatDate(character.created)}
          </p>

          {/* Display Homeworld Data */}
          {isHomeworldLoading ? (
              <Loader />
          ) : (
            homeworld && (
              <>
                <h3>Homeworld Details</h3>
                <p>
                  <strong>Name:</strong> {homeworld.name}
                </p>
                <p>
                  <strong>Terrain:</strong> {homeworld.terrain}
                </p>
                <p>
                  <strong>Climate:</strong> {homeworld.climate}
                </p>
                <p>
                  <strong>Population:</strong> {homeworld.population}
                </p>
              </>
            )
          )}
        </DetailsContainer>
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CharacterModal;
