import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;

  main {
    flex: 1;

    > h1 {
      padding: 1rem;
      font-size: 1.4rem;
    }
  }

  @media only screen and (min-width: 67em) {
    main > h1 {
      padding: 2rem 4rem;
    }
  }
`;

export const Navigation = styled.nav`
  position: sticky;
  display: flex;
  padding: 2rem 1rem;
  background: #222;
  flex-direction: column;
  gap: 2rem;
  color: #fff;
  top: 0;
  height: 100vh;

  .logo {
    text-align: center;

    h1 {
      font-size: 1.6rem;
      line-height: 1;
    }

    h2 {
      font-size: 0.8rem;
    }
  }
  
  ul {
    list-style: none;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    li {
      cursor: pointer;
      position: relative;

      &.active {
        color: #ef233c;
      }

      svg {
        display: block;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1rem;
        background: #ef233c; 
        width: 1.4rem;
        height: 1.4rem;
        line-height: 1; 
        position: absolute;
        top: -0.7rem;
        right: -0.7rem; 
        color: #fff;
        font-weight: 500; 
        border-radius: 50%;
      }
    }
  }
`;

export const Sidebar = styled.aside`
  width: 0;
  border-right: 1px solid #ddd;
  padding: 0;

  &.active {
    width: 400px;
    padding: 2rem 1rem;
  }

  > div {
    width: 100%;

    .column-header {
      h1 {
        font-size: 1.6rem;
      }

      em {
        flex: initial;
      }
    }

    .item + .item {
      margin-top: 1rem;
    }
  }
`

export const Store = styled.section`
  width: 100%;
  padding: 2rem 1rem;
  flex: 1;

  .section-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
    flex-flow: row wrap;

    h1 {
      line-height: 1;
      font-size: 1.6rem;
      width: 100%;

      span {
        color: #ef233c;
      }
    }
  }

  .items {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    padding: 0;
  }

  .item {
    width: calc(25% - 0.75rem);
    border: 1px solid #e0e0e0;
    background: #ffffff;
  }

  .item-image {
    padding: 1rem;
  }

  .item-image img {
    width: 100%;
  }

  .item-info {
    border-top: 1px solid #e0e0e0;
    padding: 1rem;
    position: relative;
  }

  .item-info .add-to-cart {
    position: absolute;
    background: #ef233c;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 0;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
  }

  .item-info .add-to-cart:disabled {
    opacity: 0.5
  }

  .add-to-cart svg {
    display: block;
  }

  .item-info span {
    color: #555;
  }

  .item-info div {
    margin-top: 1rem;
  }

  .item-info div p {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .item-info h1 {
    font-size: 1rem;
    font-weight: 700;
  }
`;
