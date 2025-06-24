import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Button } from './Layout';

const Form = styled.form`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  margin-bottom: 2rem;
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
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  min-height: 250px;
  resize: vertical;
`;

const CategorySelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
`;

const DateInput = styled(Input)`
  padding: 0.8rem;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 1.25rem;
  font-size: 1.1rem;
  margin-top: 2rem;
`;

const LetterWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('감사');
  const [sendDate, setSendDate] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [publicDate, setPublicDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const letters = JSON.parse(localStorage.getItem('letters') || '[]');
    const newLetter = {
      id: Date.now(),
      name: title,
      content,
      category,
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
                  onChange={(e) => {
                    setIsPublic(true);
                    setIsLocked(false);
                    setPublicDate('');
                  }}
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
                  onChange={(e) => setIsPublic(false)}
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
                  onChange={(e) => {
                    setIsLocked(false);
                    setPublicDate('');
                  }}
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
                  onChange={(e) => setIsLocked(true)}
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
    </Layout>
  );
};

export default LetterWrite;
