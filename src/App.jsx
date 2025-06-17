import React from 'react'
import Router from '../src/router';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f8f9fa;
  position: relative;
  border-left: 1px solid #e9ecef;
  border-right: 1px solid #e9ecef;
`

function App() {
  return (
      <AppContainer>
          <Router />
      </AppContainer>
  );
}

export default App
