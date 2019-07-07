import React from 'react';
import styled from 'styled-components';
import './App.css';

import ThreeText from './components/ThreeText.js';
import ThreeRotatingText from './components/ThreeRotatingText';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 30px;
    bottom: 30px;
    left: 30px;
    right: 30px;
    border: 2px solid #000;
    z-index: 1;
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  top: -128px;
  z-index: 3;
`;

function App() {
  return (
    <div className="App">
      <Container>
        <LogoWrapper>
          <ThreeText height="320px" width="100vw">ALDOGOMEZ</ThreeText>
        </LogoWrapper>
      </Container>
    </div>
  );
}

export default App;
