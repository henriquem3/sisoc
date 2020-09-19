import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #2ecc71;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #000000;
  width: 100%;
  height: 56px;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#2ecc71')};
  }
`;
