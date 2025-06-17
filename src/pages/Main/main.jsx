import React, { useState, useEffect } from 'react';
import * as S from './style'

const StudyMate = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [studies, setStudies] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudy, setNewStudy] = useState({
    subject: '',
    content: '',
    estimatedTime: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const savedStudies = localStorage.getItem('studymate-data');
    if (savedStudies) {
      setStudies(JSON.parse(savedStudies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('studymate-data', JSON.stringify(studies));
  }, [studies]);

  const today = new Date().toISOString().split('T')[0];
  const todayStudies = studies.filter(study => study.date === today);
  const completedToday = todayStudies.filter(study => study.completed).length;
  const progressPercentage = todayStudies.length > 0 ? (completedToday / todayStudies.length) * 100 : 0;

  const handleAddStudy = () => {
    if (newStudy.subject && newStudy.content) {
      const study = {
        id: Date.now(),
        ...newStudy,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setStudies([...studies, study]);
      setNewStudy({
        subject: '',
        content: '',
        estimatedTime: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
    }
  };

  const toggleStudyComplete = (id) => {
    setStudies(studies.map(study => 
      study.id === id ? {...study, completed: !study.completed} : study
    ));
  };

  const deleteStudy = (id) => {
    setStudies(studies.filter(study => study.id !== id));
  };

  const getStudiesForDate = (date) => {
    return studies.filter(study => study.date === date);
  };

  const generateCalendarDays = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasPlans = getStudiesForDate(dateStr).length > 0;
      days.push({ day, dateStr, hasPlans });
    }
    
    return days;
  };

  const renderToday = () => (
    <S.StudyContainer>
      <S.LeftPanel>
        <S.DateHeader>📅 오늘의 공부 계획 ({today})</S.DateHeader>
        
        <S.ProgressContainer>
          <h3>📊 오늘의 진행률</h3>
          <S.ProgressBar>
            <S.ProgressFill percentage={progressPercentage} />
          </S.ProgressBar>
          <p style={{fontSize: '1.1rem', fontWeight: 'bold'}}>{completedToday}/{todayStudies.length} 완료 ({Math.round(progressPercentage)}%)</p>
        </S.ProgressContainer>

        {!showAddForm ? (
          <S.AddButton onClick={() => setShowAddForm(true)}>
            ➕ 새 공부 계획 추가
          </S.AddButton>
        ) : (
          <S.FormContainer>
            <h3>새 공부 계획 추가</h3>
            <S.FormGroup>
              <S.Label>과목명</S.Label>
              <S.Input
                type="text"
                value={newStudy.subject}
                onChange={(e) => setNewStudy({...newStudy, subject: e.target.value})}
                placeholder="예: 수학, 영어, 국어..."
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>공부 내용</S.Label>
              <S.TextArea
                value={newStudy.content}
                onChange={(e) => setNewStudy({...newStudy, content: e.target.value})}
                placeholder="구체적인 공부 내용을 입력하세요..."
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>예상 소요 시간</S.Label>
              <S.Input
                type="text"
                value={newStudy.estimatedTime}
                onChange={(e) => setNewStudy({...newStudy, estimatedTime: e.target.value})}
                placeholder="예: 1시간, 30분..."
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>날짜</S.Label>
              <S.Input
                type="date"
                value={newStudy.date}
                onChange={(e) => setNewStudy({...newStudy, date: e.target.value})}
              />
            </S.FormGroup>
            <S.ButtonGroup>
              <S.Button onClick={() => setShowAddForm(false)}>취소</S.Button>
              <S.Button primary onClick={handleAddStudy}>저장</S.Button>
            </S.ButtonGroup>
          </S.FormContainer>
        )}
      </S.LeftPanel>

      <S.RightPanel>
        <h3 style={{margin: '0 0 20px 0', fontSize: '1.5rem', color: '#495057'}}>📋 오늘의 할 일 목록</h3>
        {todayStudies.map(study => (
          <S.StudyItem key={study.id} completed={study.completed}>
            <S.StudyHeader>
              <div>
                <S.SubjectTag completed={study.completed}>{study.subject}</S.SubjectTag>
                {study.estimatedTime && <TimeTag>⏰ {study.estimatedTime}</TimeTag>}
              </div>
            </S.StudyHeader>
            <S.StudyContent>{study.content}</S.StudyContent>
            <S.CheckboxContainer>
              <S.Checkbox
                type="checkbox"
                checked={study.completed}
                onChange={() => toggleStudyComplete(study.id)}
              />
              <span>{study.completed ? '✅ 완료!' : '⏳ 진행 중'}</span>
              <S.Button 
                onClick={() => deleteStudy(study.id)}
                style={{marginLeft: 'auto', padding: '8px 15px', fontSize: '0.9rem'}}
              >
                삭제
              </S.Button>
            </S.CheckboxContainer>
          </S.StudyItem>
        ))}

        {todayStudies.length === 0 && (
          <div style={{textAlign: 'center', padding: '60px 20px', color: '#6c757d', background: 'white', borderRadius: '15px'}}>
            <h3 style={{fontSize: '1.5rem'}}>📝 아직 오늘의 계획이 없어요!</h3>
            <p style={{fontSize: '1.1rem'}}>왼쪽 패널에서 첫 번째 공부 계획을 추가해보세요.</p>
          </div>
        )}
      </S.RightPanel>
    </S.StudyContainer>
  );

  const renderWeekly = () => {
    const weekStudies = studies.filter(study => {
      const studyDate = new Date(study.date);
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return studyDate >= weekAgo && studyDate <= weekLater;
    });

    const groupedStudies = weekStudies.reduce((acc, study) => {
      if (!acc[study.date]) {
        acc[study.date] = [];
      }
      acc[study.date].push(study);
      return acc;
    }, {});

    return (
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', width: '100%'}}>
        {Object.keys(groupedStudies).sort().map(date => {
          const dateStudies = groupedStudies[date];
          const completed = dateStudies.filter(s => s.completed).length;
          const total = dateStudies.length;
          const percentage = total > 0 ? (completed / total) * 100 : 0;
          
          return (
            <div key={date} style={{background: '#f8f9fa', borderRadius: '15px', padding: '25px'}}>
              <h3 style={{fontSize: '1.3rem', marginBottom: '15px'}}>{date} ({completed}/{total} 완료)</h3>
              <S.ProgressBar style={{marginBottom: '20px'}}>
                <S.ProgressFill percentage={percentage} />
              </S.ProgressBar>
              {dateStudies.map(study => (
                <S.StudyItem key={study.id} completed={study.completed}>
                  <S.StudyHeader>
                    <div>
                      <S.SubjectTag completed={study.completed}>{study.subject}</S.SubjectTag>
                      {study.estimatedTime && <S.TimeTag>⏰ {study.estimatedTime}</S.TimeTag>}
                    </div>
                  </S.StudyHeader>
                  <S.StudyContent>{study.content}</S.StudyContent>
                  <S.CheckboxContainer>
                    <S.Checkbox
                      type="checkbox"
                      checked={study.completed}
                      onChange={() => toggleStudyComplete(study.id)}
                    />
                    <span>{study.completed ? '✅ 완료!' : '⏳ 진행 중'}</span>
                  </S.CheckboxContainer>
                </S.StudyItem>
              ))}
            </div>
          );
        })}
        {Object.keys(groupedStudies).length === 0 && (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#6c757d', background: '#f8f9fa', borderRadius: '15px'}}>
            <h3 style={{fontSize: '1.5rem'}}>📝 이번 주 계획이 없어요!</h3>
            <p style={{fontSize: '1.1rem'}}>오늘 탭에서 새로운 계획을 추가해보세요.</p>
          </div>
        )}
      </div>
    );
  };

  const renderCalendar = () => {
    const calendarDays = generateCalendarDays();
    const currentDate = new Date();
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    return (
      <div>
        <S.DateHeader>📅 {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]} 달력</S.DateHeader>
        <S.CalendarContainer>
          {dayNames.map(day => (
            <div key={day} style={{textAlign: 'center', fontWeight: 'bold', padding: '10px'}}>
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => (
            <S.CalendarDay 
              key={index} 
              hasPlans={day?.hasPlans}
              onClick={() => day && alert(`${day.dateStr}의 계획: ${getStudiesForDate(day.dateStr).length}개`)}
            >
              {day?.day || ''}
            </S.CalendarDay>
          ))}
        </S.CalendarContainer>
        <div style={{marginTop: '20px', textAlign: 'center', color: '#6c757d'}}>
          <p>💡 파란색 날짜는 계획이 있는 날입니다. 클릭해보세요!</p>
        </div>
      </div>
    );
  };

  return (
    <S.AppContainer>
      <S.Header>
        <h1>📚 StudyMate</h1>
        <p>고등학생을 위한 스마트 공부 스케줄러</p>
      </S.Header>

      <S.TabContainer>
        <S.Tab 
          active={activeTab === 'today'} 
          onClick={() => setActiveTab('today')}
        >
          오늘 계획
        </S.Tab>
        <S.Tab 
          active={activeTab === 'weekly'} 
          onClick={() => setActiveTab('weekly')}
        >
          주간 보기
        </S.Tab>
        <S.Tab 
          active={activeTab === 'calendar'} 
          onClick={() => setActiveTab('calendar')}
        >
          달력 보기
        </S.Tab>
      </S.TabContainer>
      <S.ContentContainer>
        {activeTab === 'today' && renderToday()}
        {activeTab === 'weekly' && renderWeekly()}
        {activeTab === 'calendar' && renderCalendar()}
      </S.ContentContainer>
    </S.AppContainer>
  );
};

export default StudyMate;