import styled from 'styled-components';

export const Container = styled.div`
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

  @media only screen and (min-width: 48em) {}

  @media only screen and (min-width: 67em) {
    width: calc(50% - 1rem);
  }
`;
