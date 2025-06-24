import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Layout } from './Layout';

const WriteButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #357abd;
    transform: translateY(-2px);
  }
`;

const CategoryCard = styled.div`
  padding: 1rem;
  background: #f5f7fa;
  border-radius: 10px;
  border: 1px solid #ddd;
  flex: 1 1 200px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e8f0fe;
    transform: translateY(-2px);
  }
`;

const CategoryCardTitle = styled.h4`
  color: #4a90e2;
  margin-bottom: 0.5rem;
`;

const CategoryCardDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const SearchInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  font-family: 'Pretendard', sans-serif;
`;

const CategoryFilter = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  background-color: ${props => props.status === 'public' ? '#4caf50' : '#f44336'};
  margin-right: 0.5rem;
`;

const EmptyMessage = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-top: 3rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const LetterList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [letters, setLetters] = useState(JSON.parse(localStorage.getItem('letters') || []));
  const [filteredLetters, setFilteredLetters] = useState([]);
  const currentDate = new Date();

  // 상태 함수
  const getStatus = (letter) => {
    const isPublic = letter.isPublic === 'true' || letter.isPublic === true;
    return {
      isPublic: isPublic && (!letter.isLocked || currentDate >= new Date(letter.publicDate)),
      text: isPublic ? 
        letter.isLocked && currentDate < new Date(letter.publicDate) ? '공개 예정' : 
        '공개' : 
        '비공개',
      color: getStatusColor(isPublic && (!letter.isLocked || currentDate >= new Date(letter.publicDate)))
    };
  };

  const getStatusColor = (isPublic) => {
    return isPublic ? '#4caf50' : '#f44336';
  };

  // 검색 함수
  const searchLetters = useCallback((term, category) => {
    const termLower = term.toLowerCase();
    return letters.filter(letter => {
      const matchesSearch = (letter.name?.toLowerCase?.().includes(termLower) || '') +
                         (letter.content?.toLowerCase?.().includes(termLower) || '');
      const matchesCategory = category === 'all' || letter.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [letters]);

  // 편지 삭제 함수
  const handleDelete = (id) => {
    if (window.confirm('정말로 이 편지를 삭제하시겠습니까?')) {
      const updatedLetters = letters.filter(l => l.id !== id);
      localStorage.setItem('letters', JSON.stringify(updatedLetters));
      setLetters(updatedLetters);
    }
  };

  useEffect(() => {
    const filtered = searchLetters(searchTerm, selectedCategory);
    setFilteredLetters(filtered);
  }, [searchTerm, selectedCategory, letters, searchLetters]);

  return (
    <Layout title="내 편지함" subtitle="작성한 편지를 확인하고 관리하세요">
      <WriteButton to="/write">편지 쓰러가기</WriteButton>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
        <SearchInput
          type="text"
          placeholder="편지 제목 또는 내용 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CategoryFilter
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="감사">감사</option>
          <option value="공감">공감</option>
          <option value="인사">인사</option>
          <option value="격려">격려</option>
          <option value="추억">추억</option>
        </CategoryFilter>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
        <CategoryCard>
          <CategoryCardTitle>감사</CategoryCardTitle>
          <CategoryCardDescription>감사의 마음을 전하는 편지</CategoryCardDescription>
        </CategoryCard>
        <CategoryCard>
          <CategoryCardTitle>공감</CategoryCardTitle>
          <CategoryCardDescription>서로의 마음을 나누는 편지</CategoryCardDescription>
        </CategoryCard>
        <CategoryCard>
          <CategoryCardTitle>인사</CategoryCardTitle>
          <CategoryCardDescription>일상적인 인사를 하는 편지</CategoryCardDescription>
        </CategoryCard>
        <CategoryCard>
          <CategoryCardTitle>격려</CategoryCardTitle>
          <CategoryCardDescription>응원과 격려를 전하는 편지</CategoryCardDescription>
        </CategoryCard>
        <CategoryCard>
          <CategoryCardTitle>추억</CategoryCardTitle>
          <CategoryCardDescription>과거의 추억을 회상하는 편지</CategoryCardDescription>
        </CategoryCard>
      </div>
      {filteredLetters.length === 0 ? (
        <EmptyMessage>검색 결과가 없습니다</EmptyMessage>
      ) : (
        filteredLetters.map((letter) => (
          <Card key={letter.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>{letter.name}</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => handleDelete(letter.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#ffebee',
                    border: '1px solid #f5c6cb',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: '#721c24'
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
            <p>{letter.content}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <StatusBadge style={{ backgroundColor: getStatus(letter).color }}>
                {getStatus(letter).text}
              </StatusBadge>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                {letter.category} • {new Date(letter.sendDate).toLocaleDateString()}
              </p>
            </div>
            <Link to={`/view/${letter.id}`} style={{
              color: '#4a90e2',
              textDecoration: 'none',
              display: 'inline-block',
              marginTop: '1rem'
            }}>자세히 보기 →</Link>
          </Card>
        ))
      )}
    </Layout>
  );
};

export default LetterList;
