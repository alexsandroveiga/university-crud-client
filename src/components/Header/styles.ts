import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  height: 4rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 14px 20px rgba(0, 0, 0, 0.04);
  color: #212529;
  position: sticky;
  width: 100%;
  top: 0;

  h1 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #09bc8a;
  }

  .cart {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .cart span {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1rem;
    background: #09bc8a; 
    width: 1.4rem;
    height: 1.4rem;
    line-height: 1; 
    position: absolute;
    top: 0;
    right: 0; 
    color: #fff;
    font-weight: 500; 
    border-radius: 50%;
  }

  @media only screen and (min-width: 48em) {}

  @media only screen and (min-width: 67em) {
    padding: 0 calc((100% - 1072px) / 2);
  }
`;
