import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const MovieBlock = styled.div`
  background-color: var(--white);
  padding: 0.3rem;
  width: 20%;
  height: 25%;
  border-radius: 0.5rem;
  box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.15);
  animation: ${fade} 1s ease;

  div.title-and-image {

    img {
      width: 100%;
      height: 60%;
    }

    h3 {
      margin-left: 5px;
      font-size: 1.4rem;
      font-family: 'Space Mono', monospace;
      font-weight: 500;
      text-align: center;
    }
  }


  @media (max-width: 1280px) {
    width: 25%;
    height: 20%;
  }

  @media (max-width: 725px) {

    div.title-and-image {
      width: 30%;
    }
  }
`;