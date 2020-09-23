import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;

  table {
    margin: 24px auto;
    max-width: 900px;

    th {
      border: 1px solid #ccc;
      padding: 10px 8px;
    }

    button {
      background: none;
      border: none;

      color: #c53030;
      align-items: center;
    }

    a {
      display: flex;
      flex: 1;
      color: #505e7d;
      justify-content: center;
    }
  }
`;
