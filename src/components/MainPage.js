import React from 'react';
import { Layout, Button } from './Layout';

const MainPage = () => {
  return (
    <Layout
      title="TimeCapsule"
      subtitle="나에게 보내는 미래편지"
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>
            지금의 나에게, 미래의 나로 편지를 보내보세요.
          </p>
          <p style={{ fontSize: '1rem', color: '#999', marginBottom: '2rem' }}>
            편지를 통해 나의 생각과 감정을 기록하고, 미래의 나에게 전해보세요.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button to="/write" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              편지 쓰러가기
            </Button>
            <Button to="/list" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              내 편지함
            </Button>
          </div>
        </div>
        
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#4a90e2', marginBottom: '1rem' }}>
            편지의 종류
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <CategoryCard category="감사" description="감사의 마음을 전하는 편지" />
            <CategoryCard category="공감" description="서로의 마음을 나누는 편지" />
            <CategoryCard category="인사" description="일상적인 인사를 하는 편지" />
            <CategoryCard category="격려" description="응원과 격려를 전하는 편지" />
            <CategoryCard category="추억" description="과거의 추억을 회상하는 편지" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const CategoryCard = ({ category, description }) => {
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#f5f7fa',
      borderRadius: '10px',
      border: '1px solid #ddd',
      flex: '1 1 200px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#e8f0fe',
        transform: 'translateY(-2px)'
      }
    }}>
      <h4 style={{ color: '#4a90e2', marginBottom: '0.5rem' }}>{category}</h4>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>{description}</p>
    </div>
  );
};

export default MainPage;
