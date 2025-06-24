import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Button } from './Layout';

const SettingSection = styled.section`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
`;

const SettingGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const SettingCard = styled.div`
  flex: 1;
  background: white;
  padding: 1.5rem;
`;

const SettingTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #333;
`;

const SettingLabel = styled.label`
  display: block;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  background: ${props => props.isActive ? '#f8f9fa' : 'white'};
  transition: background 0.2s;

  &:hover {
    background: #f8f9fa;
  }

  input[type="radio"] {
    display: none;
  }

  span {
    display: block;
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 6rem;
  box-sizing: border-box;
`;

const Form = styled.form`
  width: 100%;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  font-family: 'Pretendard', sans-serif;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.5rem;
  border: 1px solid #ddd;
  font-family: 'Pretendard', sans-serif;
  min-height: 250px;
  resize: vertical;
`;

const CategorySelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  font-family: 'Pretendard', sans-serif;
`;

const DateInput = styled(Input)`
  border-radius: 0;
  padding: 0.8rem;
`;

const SubmitButton = styled(Button)`
  display: block;
  width: 100%;
  padding: 1.2rem;
  margin-top: 1.5rem;
  font-size: 1.1rem;
`;

const LetterWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('감사');
  const [sendDate, setSendDate] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [publicDate, setPublicDate] = useState('');

  // State management for public/locked
  const handlePublicChange = (e) => {
    const value = e.target.value === 'true';
    setIsPublic(value);
    if (value) {
      setIsLocked(false);
      setPublicDate('');
    }
  };

  const handleLockChange = (e) => {
    const value = e.target.value === 'true';
    setIsLocked(value);
    if (!value) {
      setPublicDate('');
    }
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const letters = JSON.parse(localStorage.getItem('letters') || '[]');
    const newLetter = {
      id: Date.now(),
      name: title,
      content,
      category: category,
      sendDate,
      isPublic,
      isLocked,
      publicDate: isLocked ? publicDate : null,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('letters', JSON.stringify([...letters, newLetter]));
    navigate('/list');
  };

  return (
    <Layout title="편지 작성" subtitle="미래의 나에게 전할 편지를 작성하세요">
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>편지 제목</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ marginBottom: '1rem' }}
            />
            <Label>카테고리</Label>
            <CategorySelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="감사">감사</option>
              <option value="공감">공감</option>
              <option value="인사">인사</option>
              <option value="격려">격려</option>
              <option value="추억">추억</option>
            </CategorySelect>
          </InputGroup>

          <SettingSection>
            <SettingTitle>공개/비공개 설정</SettingTitle>
            <SettingGroup>
              <SettingCard>
                <SettingTitle>공개/비공개</SettingTitle>
                <SettingLabel isActive={isPublic}>
                  <input
                    type="radio"
                    name="publicPrivate"
                    value="true"
                    checked={isPublic}
                    onChange={handlePublicChange}
                  />
                  <span>
                    <strong>공개</strong>
                    <br />
                    <small>편지를 작성한 즉시 모든 사용자가 볼 수 있습니다.</small>
                  </span>
                </SettingLabel>
                <SettingLabel isActive={!isPublic}>
                  <input
                    type="radio"
                    name="publicPrivate"
                    value="false"
                    checked={!isPublic}
                    onChange={handlePublicChange}
                  />
                  <span>
                    <strong>비공개</strong>
                    <br />
                    <small>작성자만 편지를 볼 수 있습니다.</small>
                  </span>
                </SettingLabel>
              </SettingCard>

              <SettingCard>
                <SettingTitle>공개일 설정</SettingTitle>
                <SettingLabel isActive={!isLocked}>
                  <input
                    type="radio"
                    name="lock"
                    value="false"
                    checked={!isLocked}
                    onChange={handleLockChange}
                  />
                  <span>
                    <strong>날짜와 상관없이 공개</strong>
                    <br />
                    <small>편지가 공개되면 언제든지 볼 수 있습니다.</small>
                  </span>
                </SettingLabel>
                <SettingLabel isActive={isLocked}>
                  <input
                    type="radio"
                    name="lock"
                    value="true"
                    checked={isLocked}
                    onChange={handleLockChange}
                  />
                  <span>
                    <strong>특정 날짜까지 비공개</strong>
                    <br />
                    <small>특정 날짜가 되기 전까지 비공개로 유지됩니다.</small>
                  </span>
                </SettingLabel>
                {isLocked && (
                  <div style={{ marginTop: '1rem' }}>
                    <Label>공개일 선택</Label>
                    <DateInput
                      type="date"
                      value={publicDate}
                      onChange={(e) => setPublicDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                )}
              </SettingCard>
            </SettingGroup>
          </SettingSection>

          <InputGroup>
            <Label>전송 예정일</Label>
            <DateInput
              type="date"
              value={sendDate}
              onChange={(e) => setSendDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </InputGroup>

          <InputGroup>
            <Label>편지 내용</Label>
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </InputGroup>

          <SubmitButton type="submit">편지 보내기</SubmitButton>
        </Form>
      </Container>
    </Layout>
  );
};

export default LetterWrite;
