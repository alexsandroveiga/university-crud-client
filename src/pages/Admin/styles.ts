import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  min-height: 100vh;

  main {
    margin: 0 calc((100% - 1072px) / 2);
  }

  .message {
    background: #fff;
    width: 1072px;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-weight: 500;
    margin: 0 auto;

    svg {
      display: block;
      opacity: 0.8;

      &.loading {
        animation: ${rotate} 1s linear infinite;
      }
    }
  }
`;

export const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;

  .empty {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .item {
    width: calc(50% - 0.5rem);
    background: #ffffff;
    position: relative;
    padding: 0;
    display: flex;
    overflow: hidden;

    &.full {
      width: 100%;
      padding: 1rem;

      button.full {
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 500;
        margin: 0 auto;
        border: 0;
      }
    }

    .moto {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 0.5rem;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }

      h1 {
        font-size: 1rem;
        line-height: 1;
        margin: 0;
      }

      span {
        font-size: 0.8rem;
        line-height: 1;
        margin: 0;
        display: block;
      }
    }

    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
    }

    h1 {
      font-size: 1.2rem;
      font-weight: 500;
    }

    p {
      color: #aaa;

      &.featured {
        font-weight: 500;
        color: #2196f3;
        margin-top: 0.5rem;
      }
    }

    .content {
      display: flex;
      flex: 1;
      padding: 1rem;
      gap: 1rem;
    }

    .actions {
      display: flex;
      background: #2196f3;
      width: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      button {
        width: 2rem;
        height: 2rem;
        background: transparent;
        border: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        svg {
          display: block;
          color: #ffffff;
          opacity: 1
        }
      }
    }
  }
`;

export const Heading = styled.div`
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  width: 1072px;
  justify-content: space-between;
  gap: 1rem;

  em {
    flex: 1;
  }

  button {
    font-size: 1.2rem;
    color: #212529;
    background: transparent;
    border: 0;
    font-weight: bold;

    &.active {
      color: #2196f3;
    }
  }

  span {
    color: #2196f3;
    font-weight: 400;
    color: #888;
  }

  input {
    height: 2rem;
    border-radius: 1rem;
    border: 1px solid #ccc;
    padding: 0 1rem;

    &:focus {
      border-color: #2196f3;
    }
  }

  /* span {
    position: relative;
    color: #fff;
    margin-left: 1rem;

    &:after {
      content: '';
      width: calc(100% + 1.25rem);
      height: calc(100% + 1.25rem);
      background: #2196f3;
      top: -0.625rem;
      left: -0.625rem;
      position: absolute;
      z-index: -1;
      border-radius: 21% 79% 22% 78% / 63% 55% 45% 37%;
    }
  } */
`;

export const SubNav = styled.header`
  padding: 0 calc((100% - 1072px) / 2);
  background: #222;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  .menu {
    background: #2196f3;
    height: 3rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
    font-weight: 500;

    svg {
      display: block;
    }
  }

  a {
    color: #fff;
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
  }
`;