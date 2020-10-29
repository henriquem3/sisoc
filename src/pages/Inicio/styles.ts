import styled from 'styled-components';

export const Content = styled.div`
  padding-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: auto;
`;

export const Grid = styled.div`
  margin-top: 20px;
  max-width: 900px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 30px;
  justify-content: space-between;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;

    background-color: #1c7c44;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 300;

    width: 100%;
    height: 150px;

    p {
      font-size: 32px;
    }
  }
`;
