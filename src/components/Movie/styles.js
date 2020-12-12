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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.5rem;
  box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.15);
  animation: ${fade} 1s ease;

  div.title-and-image {
    display: flex;

    img {
      width: 100%;
      height: 60%;
    }
  }

  div.stats {
    height: 10%;

    display: flex;
    flex-direction: column;

    .stat-row {
      margin-top: 5px;
      label {
        font-weight: 600;
      }

      span {
        font-weight: 400;
      }
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
    width: 30%;
  }

  @media (max-width: 725px) {
    width: 90%;
    height: 20%;
    order: 1;

    overflow-y: scroll;

    /* Scroll Width */
    &::-webkit-scrollbar {
      width: 5px;
    }

    /* Scroll Track */
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    /* Scroll Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--color-primary);
      border-radius: 10px;
    }

    /* Scroll handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      filter: brightness(0.9);
    }

    div.title-and-image {
      flex-direction: column;
      align-items: center;
    }

    div.stats {
      align-items: center;

      .stat-row {
        text-align: center;
      }
    }
  }
`;