import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
  overflow: hidden; /* Prevent scrolling of background content */
`;

export const ModalContent = styled.div`
  background: linear-gradient(135deg, #ff6ec4 0%, #7873f5 100%);
  padding: 20px;
  border-radius: 12px;
  border: 2px solid ${(props) => props.theme.colors.accent};
  max-width: 600px;
  width: 100%;
  max-height: 80vh; /* Constrain modal height to 80% of the viewport height */
  overflow-y: auto; /* Enable vertical scrolling for overflowing content */
  position: relative;
  color: ${(props) => props.theme.colors.textLight};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  text-align: center;
  font-size: 1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 10px;
  }
`;

export const DetailsContainer = styled.div`
  text-align: left;
  margin-bottom: 20px;

  p {
    margin: 5px 0;
  }

  @media (max-width: 480px) {
    text-align: center;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textLight};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  margin: 5px;
  background-color: ${(props) => (props.primary ? props.theme.colors.accent : '#ffffff')};
  color: ${(props) => (props.primary ? '#ffffff' : props.theme.colors.accent)};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.primary ? '#ffffff' : props.theme.colors.accent)};
    color: ${(props) => (props.primary ? props.theme.colors.accent : '#ffffff')};
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;
