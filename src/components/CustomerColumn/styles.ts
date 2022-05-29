import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  .column-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;

    h1 {
      line-height: 1;
      font-size: 1.2rem;

      span {
        color: #f35b04;
      }
    }

    button {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 0;
      cursor: pointer;

      &:disabled {
        opacity: 0.5;
      }

      svg {
        display: block;
        color: #f35b04;
      }
    }

    em {
      flex: 1;
    }
  }

  .item {
    background: #ffffff;
    border-radius: 0.25rem;
    position: relative;
    padding: 0;
    display: flex;
    overflow: hidden;

    &:before {
      content: '';
      background: #f35b04;
      width: 2px;
      height: calc(100% - 2rem);
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
    }

    & + .item {
      margin-top: 2rem;
    }

    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
    }

    h1 {
      font-size: 1.2rem;
      font-weight: 500;
    }

    p {
      color: #aaa;
      word-break: break-all;

      &.featured {
        font-weight: 500;
        color: #f35b04;
        margin-top: 0.5rem;
      }
    }

    .content {
      display: flex;
      flex: 1;
      padding: 1rem 1rem 1rem calc(2rem + 2px);
      gap: 1rem;
    }

    .actions {
      display: flex;
      background: #f35b04;
      width: 4rem;
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

  @media only screen and (min-width: 48em) {}

  @media only screen and (min-width: 67em) {
    width: calc(50% - 2rem);

    .item + .item {
      margin-top: 2rem;
    }
  }
`;
