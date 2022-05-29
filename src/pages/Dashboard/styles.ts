import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;

  main {
    background: #f0f0f0;
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

export const Sidebar = styled.aside`
  background: #ffffff;
  width: 200px;
  display: none;
  padding: 1rem;

  @media only screen and (min-width: 67em) {
    display: block;
  }
`;

export const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 1rem;
  gap: 1rem;  

  @media only screen and (min-width: 48em) {}

  @media only screen and (min-width: 67em) {
    gap: 4rem;
    padding: 0 4rem;
  }
`;
