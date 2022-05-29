import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  max-width: 600px;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  padding: 1rem;
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transition: all 0.25s ease;
  text-align: left !important;
  overflow: auto;

  &.visible {
    opacity: 1;
    visibility: visible;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    h1 {
      text-align: center;
      font-size: 1.4rem;
      line-height: 1;
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

      svg {
        display: block;
        color: #222324;
      }
    }
  }  

  form {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;

    .input {
      width: 100%;

      label {
        display: block;
        font-weight: 500;
      }

      input {
        border: 1px solid #cccccc;
        margin-top: 0.5rem;
        width: 100%;
        height: 3rem;
        padding: 0 1rem;
        font-size: 1rem;

        &:focus {
          outline: none;
          border: 1px solid #8338ec;
        }
      }
    }

    button {
      height: 3rem;
      font-size: 1rem;
      font-weight: 500;
      color: #fff;
      background: #8338ec;
      border: 0;
      border-radius: 1.5rem;
      width: 100%;
      cursor: pointer;
    }
  }  

  @media only screen and (min-width: 48em) {}

  @media only screen and (min-width: 67em) {
    width: 600px;
    height: auto;
    padding: 2rem;

    form .input {
      width: calc(50% - 0.5rem);
    }
  }
`;
