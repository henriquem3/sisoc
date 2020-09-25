import styled from 'styled-components';

import Tooltip from '../Tooltip';

export const InputControl = styled.div`
  width: 100%;

  border: 2px solid #0e141a;
  color: #b9c0c1;

  display: flex;
  align-items: center;

  textarea {
    flex: 1;
    padding: 12px 12px;
    background: transparent;
    border: 0;
    color: #1a2530;
    font-family: 'Roboto Slab', serif;
    font-size: 16px;

    &::placeholder {
      color: #b9c0c1;
    }
  }

  & + div {
    margin-top: 8px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
