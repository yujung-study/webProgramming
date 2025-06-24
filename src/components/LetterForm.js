import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 폼 카드 스타일
const Card = styled.div`
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
`;

// 입력 필드 스타일
const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: 'Pretendard', sans-serif;
`;

// 텍스트 영역 스타일
const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-family: 'Pretendard', sans-serif;
  min-height: 200px;
  resize: vertical;
`;

// 제출 버튼 스타일
const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;

/**
 * 편지 폼 컴포넌트
 * @description 편지를 작성하고 저장하는 폼 컴포넌트입니다.
 * 편지의 기본 정보와 내용을 입력받아 localStorage에 저장합니다.
 */
const LetterForm = () => {
  // 네비게이션 훅
  const navigate = useNavigate();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: '', // 작성자 이름
    sendDate: '', // 전송 예정일
    category: '감사', // 카테고리 (기본값: 감사)
    content: '', // 편지 내용
    isPublic: true // 공개/비공개 상태 (기본값: 공개)
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const letters = JSON.parse(localStorage.getItem('letters') || '[]');
    const newLetter = {
      ...formData,
      id: Date.now() // 고유한 ID 생성
    };
    localStorage.setItem('letters', JSON.stringify([...letters, newLetter]));
    navigate('/list'); // 편지 목록 페이지로 이동
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        {/* 이름 입력 필드 */}
        <Input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        {/* 전송 예정일 입력 필드 */}
        <Input
          type="date"
          name="sendDate"
          placeholder="전송 예정일"
          value={formData.sendDate}
          onChange={handleChange}
          required
        />

        {/* 공개/비공개 설정 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>공개/비공개 설정</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <label>
              <input
                type="radio"
                name="publicPrivate"
                checked={formData.isPublic}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    isPublic: true
                  }));
                }}
              />
              공개
            </label>
            <label>
              <input
                type="radio"
                name="publicPrivate"
                checked={!formData.isPublic}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    isPublic: false
                  }));
                }}
              />
              비공개
            </label>
          </div>
        </div>

        {/* 카테고리 선택 */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.8rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontFamily: 'Pretendard, sans-serif'
          }}
        >
          <option value="감사">감사</option>
          <option value="공감">공감</option>
          <option value="인사">인사</option>
          <option value="격려">격려</option>
          <option value="추억">추억</option>
        </select>

        {/* 편지 내용 입력 */}
        <div style={{ marginBottom: '1rem' }}>
          <TextArea
            name="content"
            placeholder="편지 내용을 입력해주세요..."
            value={formData.content}
            onChange={handleChange}
            required
          />
          <SubmitButton type="submit">편지 저장</SubmitButton>
        </div>
      </form>
    </Card>
  );
};

export default LetterForm;
