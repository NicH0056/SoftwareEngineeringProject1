import React from 'react';
import Canvas from './Canvas/Canvas';
import './Canvas/design.css'
import { Row, Col, Container } from 'react-bootstrap'
function App() {
  return (
    <div className="App">
      <main>
        <ul>
            <li><a href="/">FlowMap</a></li>
            <li><a href="http://localhost:3001/">Home</a></li>

        </ul>
        <Container>
          <Row>
            <Col> <Canvas/> </Col>
          </Row>
        </Container>
      </main>

    </div>
  );
}

export default App;
