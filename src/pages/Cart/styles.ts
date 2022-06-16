import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;

  main {
    margin: 0 calc((100% - 1072px) / 2);
    background: #fff;
    padding: 2rem;
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

    button, a {
      text-decoration: none;
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
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: initial;
      }
    }
  }
`;

export const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;

  .empty {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .item {
    width: calc(50% - 1rem);
    display: flex;
    flex-flow: column wrap;
    gap: 1rem;
    height: 150px;
    justify-content: space-between;

    > *:not(.image) {
      width: calc(100% - 150px - 1rem)
    }

    .image {
      width: 150px;
      height: 150px;
      overflow: hidden;
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
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      em {
        flex: 1;
      }

      button {
        width: 2rem;
        height: 2rem;
        border-radius: 0.75rem;
        background: transparent;
        border: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #888;

        &:last-child {
          background: #bbb;
          border-color: #bbb;
          color: #fff;
        }

        svg {
          display: block;
        }
      }
    }
  }
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