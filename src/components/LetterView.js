import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Title = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const Card = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
`;

const BackButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;

const PrivateMessage = styled.div`
  background: #f8d7da;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #f5c6cb;
  color: #721c24;
  text-align: center;
  font-size: 1.1rem;
`;

const LetterView = () => {
  const { id } = useParams();
  const letters = JSON.parse(localStorage.getItem('letters') || '[]');
  const letter = letters.find(l => l.id === parseInt(id));
  const currentDate = new Date();
  const sendDate = letter?.sendDate ? new Date(letter.sendDate) : new Date();
  const isPrivate = letter?.sendDate ? currentDate < sendDate : false;
  const isPublic = letter?.isPublic === 'true' || letter?.isPublic === true; // 공개/비공개 상태 확인
  const canViewContent = isPublic || (isPrivate && currentDate >= sendDate); // 공개 상태이거나, 비공개지만 전송일이 지났을 때 내용을 볼 수 있음

  if (!letter) {
    return <div>편지를 찾을 수 없습니다</div>;
  }

  return (
    <div>
      <BackButton to="/list">← 돌아가기</BackButton>
      <Title>{letter.name}님의 편지</Title>
      <Card>
        <p>카테고리: {letter.category}</p>
        <p>전송 예정일: {letter?.sendDate || '미정'}</p>
        {!canViewContent ? (
          <PrivateMessage>
            {isPublic ? (
              <>
                이 편지는 작성자가 비공개로 설정했습니다.<br/>
                작성자만 내용을 확인할 수 있습니다.
              </>
            ) : (
              <>
                이 편지는 {letter.sendDate}에 공개됩니다.<br/>
                그 때까지 내용을 확인할 수 없습니다.
              </>
            )}
          </PrivateMessage>
        ) : (
          <div style={{ marginTop: '2rem' }}>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{letter.content}</p>
          </div>
        )}

      </Card>
    </div>
  );
};

export default LetterView;
