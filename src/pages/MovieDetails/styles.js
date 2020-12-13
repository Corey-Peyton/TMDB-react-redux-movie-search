import styled, { css, keyframes } from 'styled-components';

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
  width: 100%;
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
      margin-right: 10%;
    }

    &:hover {
      color: var(--color-blue-darker);
    }
  }
`;

export const Container = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  .image {
    animation: ${fade} 1s ease;
  }

  .stats {
    animation: ${fade} 1s ease;
  }

  .stat-row {
    margin-top: 5%;
    justify-content: center;
    margin-left: 1%;
    margin-right: 1%;
  }

  @media (max-width: 1920px) {
    .image {
      width: 30%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .stats {
      width: 70%;
      height: 100%;
    }
  }

  @media (max-width: 1366px) {
    .image {
      width: 30%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .stats {
      width: 70%;
      height: 100%;

      .stat-row {
        margin-top: 5%;
      }
    }
  }

  @media (max-width: 1080px) {
    .image {
      width: 30%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .stats {
      width: 70%;
      height: 100%;

      .stat-row {
        margin-top: 5%;

        h1 {
          font-size: 26px;
        }

        h5, .strong {
          font-size: 13px;
        }

        p {
          font-size: 11px;
        }

        .rating-and-genre {
          font-size: 11px;
        }
      }
    }
  }

  @media (max-width: 780px) {
    margin-top: -20%;
    display: block;
    .image {
      width: 100%;
      height: 100%;
    }
    .stats {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 580px) {
    display: block;
    margin-top: -20%;
    .image {
      width: 100%;
      height: 100%;
    }
    .stats {
      width: 100%;
      height: 100%;
    }
  }
`;