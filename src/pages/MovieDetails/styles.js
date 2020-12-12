import styled, { keyframes, css } from 'styled-components';

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

export const FullPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--white-darker);

  a.back-link {
    color: var(--color-blue);
    text-decoration: none;
    position: absolute;
    top: 1.1rem;
    left: 1.1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;

    i {
      margin-right: 6px;
    }

    &:hover {
      color: var(--color-blue-darker);
    }
  }
`;

export const Container = styled.div`
  width: 80%;
  height: 65%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 725px) {
    height: 80%;
  }
`;

export const DetailBlock = styled.aside`
  background-color: var(--white);
  padding: 0rem;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.5rem;
  box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.15);
  animation: ${fade} 1s ease;

  div.title-and-image {
    display: flex;

    img {
      width: 100%;
      height: 215px;
    }

    h1 {
      margin-left: 5px;
      font-size: 1.4rem;
      font-family: 'Space Mono', monospace;
      font-weight: 500;
      text-align: center;
    }
  }

  div.stats {
    height: 40%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .stat-row {
      label {
        font-weight: 600;
      }

      span {
        font-weight: 400;
      }
    }
  }

  @media (max-width: 1280px) {
    width: 49%;
  }

  @media (max-width: 725px) {
    width: 100%;
    height: 80%;
    order: 1;

    h1 {
      margin-bottom: 20px;
    }

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