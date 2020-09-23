import styled from 'styled-components';

export const Container = styled.nav`
  > ul {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 21px;

    button {
      border: 0;
      background: none;
    }
  }

  width: 100%;
`;

export const DropdownStyles = styled.div`
  .dropdown-option {
    padding: 10px 15px;
    outline: 0;
    color: #000;
    font-size: 16px;

    transition: opacity 0.2s;

    &:hover,
    &:focus {
      opacity: 0.55;
    }
  }

  .dropdown-root {
    z-index: 10;
    position: absolute;
  }

  .dropdown-arrow {
    position: relative;
    &::before {
      border-top: 1px solid #505e7d;
      border-left: 1px solid #505e7d;
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      background: #f6f5ff;
      top: -6.5px;
      left: -8px;
      border-radius: 4px 0 0 0;
      transform: rotate(45deg);
    }
  }

  .dropdown-container {
    position: absolute;
    overflow: hidden;
    box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
      0 30px 60px -30px rgba(0, 0, 0, 0.3),
      0 -18px 60px -10px rgba(0, 0, 0, 0.025);

    background: #f6f5ff;
    border: 1px solid #505e7d;
    border-radius: 4px;
  }

  .dropdown-section {
    position: absolute;
  }

  .dropdown-background {
    bottom: 0;
    background: #f6f9fc;
    width: 100%;
  }
`;

