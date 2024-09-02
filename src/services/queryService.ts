import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'https://swapi.dev/api';

// Fetch characters with pagination
const fetchCharacters = async (context: QueryFunctionContext) => {
  const page = context.queryKey[1] as number;
  const response = await axios.get(`${API_BASE_URL}/people/?page=${page}`);
  return response.data;
};

// Fetch homeworld details
const fetchHomeworld = async (homeworldUrl: string) => {
  const response = await axios.get(homeworldUrl);
  return response.data;
};

// Fetch species details
const fetchSpecies = async (speciesUrl: string) => {
  const response = await axios.get(speciesUrl);
  return response.data;
};

// Custom React Query Hook for fetching characters
export const useCharacters = (page: number) =>
  useQuery({
    queryKey: ['characters', page],
    queryFn: fetchCharacters,
    staleTime: 1000 * 60 * 5,
  });

// Custom React Query Hook for fetching homeworld data
export const useHomeworld = (homeworldUrl: string) =>
  useQuery({
    queryKey: ['homeworld', homeworldUrl],
    queryFn: () => fetchHomeworld(homeworldUrl),
    staleTime: 1000 * 60 * 5,
    enabled: !!homeworldUrl,
  });

// Custom React Query Hook for fetching species data
export const useSpecies = (speciesUrl: string) =>
  useQuery({
    queryKey: ['species', speciesUrl],
    queryFn: () => fetchSpecies(speciesUrl),
    staleTime: 1000 * 60 * 5,
    enabled: !!speciesUrl,
  });
