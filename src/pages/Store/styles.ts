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

  .order {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    margin-top: 4rem;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      h1 {
        font-size: 1.2rem
      }
    }

    button {
      height: 3rem;
      background: #2196f3;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 2rem;
      width: calc(50% - 0.5rem);
      border: 0;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 500;

      &:disabled {
        opacity: 0.6;
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
    width: calc(25% - 0.75rem);
    background: #fff;
    padding: 1rem;
    position: relative;

    .image {
      width: 100%;
      height: 150px;
      overflow: hidden;
      margin-bottom: 0.75rem;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      flex: 1;
    }

    .info {
      h1 {
        font-size: 1.125rem;
        line-height: 1;
        font-weight: 500;
      }

      p {
        color: #888;
      }

      .quantity {
        margin-bottom: 0.5rem;
        display: block;
      }

      button {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 50%;
        background: transparent;
        border: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #888;
        cursor: pointer;
        position: absolute;
        bottom: 1rem;
        right: 1rem;

        &:last-child {
          background: #2196f3;
          border-color: #2196f3;
          color: #fff;
        }

        &:disabled {
          opacity: 0.8
        }

        svg {
          display: block;
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

  h1 {
    font-size: 1.2rem;
    color: #2196f3;
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