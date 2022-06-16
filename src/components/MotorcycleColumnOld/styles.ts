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
  width: 100%;

  .column-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
    flex-flow: row wrap;

    h1 {
      line-height: 1;
      font-size: 1.2rem;
      width: 100%;
      margin-bottom: 0.5rem;

      span {
        color: #ef233c;
      }
    }

    input {
      height: 3rem;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      margin-right: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 1.5rem;
      margin-right: 0.5rem;
      flex: 1;

      &:focus {
        border-color: #ef233c;
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
        color: #ef233c;
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
      background: #ef233c;
      width: 2px;
      height: calc(100% - 2rem);
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
    }

    & + .item {
      margin-top: 1rem;
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

      &.featured {
        font-weight: 500;
        color: #ef233c;
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
      background: #ef233c;
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

  .message {
    background: #8338ec;
    color: #fff;
    border-radius: 0.25rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500; 

    svg {
      display: block;
      opacity: 0.8;

      &.loading {
        animation: ${rotate} 1s linear infinite;
      }
    }
  }

  @media only screen and (min-width: 48em) {
    /* .column-header {
      h1 {
        width: auto;
        margin-bottom: 0;
      }
    } */
  }

  @media only screen and (min-width: 67em) {
    width: calc(50% - 2rem);

    .item + .item {
      margin-top: 2rem;
    }
  }
`;
