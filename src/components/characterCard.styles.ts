import styled from 'styled-components';

export const Card = styled.div<{ speciesColor: string }>`
  background-color: ${(props) => props.speciesColor}; 
  border: 1px solid #555;
  padding: 20px;
  margin: 8px;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-align: center;
  color: ${(props) => props.theme.colors.textLight}; 
  font-size: 1rem; /* Updated font size */
  font-weight: 500; /* Medium font weight for card content */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  }

  img {
    border-radius: 8px;
    margin-top: 10px;
    width: 100%;
    height: auto;
  }

  h3 {
    margin: 10px 0;
    font-size: 1.2rem; /* Slightly larger font size for card title */
  }
`;
