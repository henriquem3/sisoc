import styled from 'styled-components';
import { shade, tint } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: stretch;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #312e38;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#312e38')};
      }
    }

    select {
      display: none;
      border-radius: 10px;
      border: 2px solid #0e141a;

      width: 100%;
      margin-top: 8px;
      padding: 16px 8px;

      display: flex;

      font-family: 'Roboto Slab', serif;
      font-size: 16px;
    }
  }

  > a {
    color: #114b29;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${tint(0.3, '#114B29')};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;
`;
