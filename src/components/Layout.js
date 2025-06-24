import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 2.5rem;
  color: #4a90e2;
  margin-bottom: 2rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 5rem;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 1.5rem;

  &:hover {
    background-color: #357abd;
    transform: translateY(-2px);
  }
`;

const Layout = ({ children, title, subtitle }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Container>
  );
};

export { Layout, Button };
