import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// 편지 제목 스타일
const Title = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 2.5rem;
  text-align: center;
`;

// 편지 내용 카드 스타일
const Card = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
`;

// 뒤로 가기 버튼 스타일
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

// 비공개 메시지 스타일
const PrivateMessage = styled.div`
  background: #f8d7da;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #f5c6cb;
  color: #721c24;
  text-align: center;
  font-size: 1.1rem;
`;

/**
 * 편지 상세보기 컴포넌트
 * @description 특정 편지를 상세하게 보여주는 컴포넌트입니다.
 * 편지의 공개/비공개 상태에 따라 내용을 제한적으로 보여줍니다.
 */
const LetterView = () => {
  // URL 파라미터에서 편지 ID 추출
  const { id } = useParams();
  // localStorage에서 모든 편지 데이터 불러오기
  const letters = JSON.parse(localStorage.getItem('letters') || '[]');
  // 해당 ID의 편지 찾기
  const letter = letters.find(l => l.id === parseInt(id));
  // 현재 날짜와 편지의 전송 예정일 설정
  const currentDate = new Date();
  const sendDate = letter?.sendDate ? new Date(letter.sendDate) : new Date();
  // 편지의 공개/비공개 상태와 접근 가능 여부 확인
  const isPrivate = letter?.sendDate ? currentDate < sendDate : false;
  const isPublic = letter?.isPublic === 'true' || letter?.isPublic === true;
  const canViewContent = isPublic || (isPrivate && currentDate >= sendDate);

  // 편지가 없을 경우 에러 메시지 표시
  if (!letter) {
    return <div>편지를 찾을 수 없습니다</div>;
  }

  return (
    <div>
      {/* 뒤로 가기 버튼 */}
      <BackButton to="/list">← 돌아가기</BackButton>
      {/* 편지 제목 표시 */}
      <Title>{letter.name}님의 편지</Title>
      {/* 편지 내용 카드 */}
      <Card>
        {/* 편지의 기본 정보 표시 */}
        <p>카테고리: {letter.category}</p>
        <p>전송 예정일: {letter?.sendDate || '미정'}</p>
        {/* 편지 내용 접근 가능 여부에 따른 조건부 렌더링 */}
        {!canViewContent ? (
          <PrivateMessage>
            {/* 공개/비공개 상태에 따른 다른 메시지 표시 */}
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
