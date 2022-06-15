import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 calc((100% - 1072px) / 2);
  display: flex;
  gap: 2rem;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  em {
    flex: 1;
  }

  a {
    color: #2196f3;
    position: relative;

    span {
      background: #2196f3;
      color: #fff;
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
      font-weight: 500;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .logo {
    line-height: 1;
    font-size: 0.625rem;
    text-align: center;
    font-weight: 500;

    h1 {
      font-size: 1.8rem;
      font-weight: bold;
      color: #2196f3;
    }
  }

  .avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      display: block;
    }
  }
`;
