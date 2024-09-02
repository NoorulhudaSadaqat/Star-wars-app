import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif; /* Updated font family */
    background-color: ${(props) => props.theme.colors.primary}; 
    color: ${(props) => props.theme.colors.textLight};
    font-size: 16px; /* Base font size */
    line-height: 1.6; /* Improve readability */
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600; /* Bold headings */
  }

  p {
    margin: 0 0 10px;
    font-size: 1rem; /* Adjusted paragraph size */
  }

  button {
    cursor: pointer;
    outline: none;
    font-family: 'Poppins', sans-serif; /* Ensure font consistency */
  }

  .character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
  }
`;

export default GlobalStyles;
