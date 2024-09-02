import styled from 'styled-components';

export const Loader = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.accent};
  text-align: center;
  margin-top: 20px;
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
`;

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .character-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* Set grid to 5 columns by default */
    gap: 16px;
    width: 100%;
    max-width: 1400px; /* Increased max width for better spacing */

    @media (max-width: 1200px) {
      grid-template-columns: repeat(4, 1fr); /* 4 columns for medium screens */
    }

    @media (max-width: 992px) {
      grid-template-columns: repeat(3, 1fr); /* 3 columns for smaller screens */
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr); /* 2 columns for tablets */
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr); /* 1 column for mobile devices */
    }
  }

  .pagination-controls {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const PaginationButton = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.textLight};
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.secondary};
  }

  @media (max-width: 480px) {
    width: 100%; 
    font-size: 0.9rem;
  }
`;
