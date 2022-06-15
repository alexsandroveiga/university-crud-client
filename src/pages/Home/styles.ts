import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
`;

export const Content = styled.main`
  padding: 1rem;
  display: flex;

  button {
    padding: 2rem;
  }

  > h1 {
    color: #121212;
  }
`;

export const Heading = styled.div`
  margin: 5rem auto 2rem;
  display: flex;
  align-items: center;

  h1 {
    margin: 0 auto;
    font-size: 1.2rem;
  }

  span {
    position: relative;
    color: #fff;
    margin-right: 1rem;

    &:after {
      content: '';
      width: calc(100% + 1.25rem);
      height: calc(100% + 1.25rem);
      background: #ef233c;
      top: -0.625rem;
      left: -0.625rem;
      position: absolute;
      z-index: -1;
      border-radius: 21% 79% 22% 78% / 63% 55% 45% 37%;
    }
  }
`;

export const Grid = styled.main`
  width: 1072px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  
  .item {
    width: calc(25% - 0.75rem);
    overflow: hidden;
    border-radius: 0.5rem;
    background: rgba(255,255,255,0.6);
    padding: 0.5rem;

    .item-image {
      width: 100%;
      height: auto;
      border-radius: 0.5rem;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }
`;

export const Cart = styled.main`
  background: #fff;
  margin: 0 auto;
  opacity:0;
  height: 0;
  padding: 0 1rem;
  overflow: hidden;
  transition: all .3s ease .15s;
  
  &.visible { 
    opacity: 1;
    height: calc(100vh - 4rem);
    padding: 1rem;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
  }

  .cart-items > div {
    max-width: 100%;
    overflow: hidden;

    .item-header {
      position: relative;

      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
      }

      > button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 2rem;
        height: 2rem;
        border: 0;
        background: transparent;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #e63946;
        border-radius: 50%;

        svg {
          display: block;
          color: #fff;
          opacity: 0.7;
        }
      }

      .actions {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        display: flex;
        background: #fff;
        height: 2rem;
        border-radius: 1rem;
        padding: 0 1rem;
        align-items: center;
        gap: 0.5rem;

        button {
          width: 2rem;
          height: 2rem;
          border: 0;
          background: transparent;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          svg {
            display: block;
          }

          &:disabled {
            opacity: 0.4;
            cursor: default;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 48em) {}

  @media only screen and (min-width: 67em) {
    max-width: 1072px;
    position: fixed;
    width: 400px;
    right: calc((100% - 1072px) / 2);
    top: 5rem;
    
    &.visible {
      height: 50vh;
    }
  }
`;

export const Post = styled.article`
  img {
    max-width: 100%;
    display: block;
  }
`;
