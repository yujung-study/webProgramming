import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: 'Pretendard', sans-serif;
`;

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

const LetterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    sendDate: '',
    category: '감사',
    content: '',
    isPublic: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const letters = JSON.parse(localStorage.getItem('letters') || '[]');
    const newLetter = {
      ...formData,
      id: Date.now()
    };
    localStorage.setItem('letters', JSON.stringify([...letters, newLetter]));
    navigate('/list');
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="sendDate"
          placeholder="전송 예정일"
          value={formData.sendDate}
          onChange={handleChange}
          required
        />

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
