import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  padding: 6rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 2.5rem;
  color: #4a90e2;
  margin-bottom: 2rem;
`;

const Subtitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 5rem;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
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
