import styled from "styled-components";

const AppContainer = styled.div`
  width: 100vw;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  box-sizing: border-box;
`;

const Header = styled.header`
  text-align: center;
  padding: 40px 20px;
  color: white;
  
  h1 {
    font-size: 3.5rem;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  
  p {
    font-size: 1.3rem;
    margin: 15px 0;
    opacity: 0.9;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? 'white' : 'rgba(255,255,255,0.2)'};
  color: ${props => props.active ? '#667eea' : 'white'};
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255,255,255,0.3)'};
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  margin: 0;
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 40px;
  box-shadow: 0 -5px 30px rgba(0,0,0,0.1);
  min-height: 80vh;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 20px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const StudyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftPanel = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StudyItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  border-left: 5px solid ${props => props.completed ? '#28a745' : '#667eea'};
  opacity: ${props => props.completed ? 0.8 : 1};
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const StudyHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 10px;
`;

const SubjectTag = styled.span`
  background: ${props => props.completed ? '#28a745' : '#667eea'};
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const TimeTag = styled.span`
  background: #6c757d;
  color: white;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  margin-left: 10px;
`;

const StudyContent = styled.div`
  margin: 10px 0;
  font-size: 1rem;
  color: #495057;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const ProgressContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
`;

const ProgressBar = styled.div`
  background: #e9ecef;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
  margin: 10px 0;
`;

const ProgressFill = styled.div`
  background: linear-gradient(45deg, #28a745, #20c997);
  height: 100%;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
  border-radius: 10px;
`;

const FormContainer = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #495057;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s ease;
  
  ${props => props.primary ? `
    background: #667eea;
    color: white;
    &:hover { background: #5a67d8; }
  ` : `
    background: #6c757d;
    color: white;
    &:hover { background: #5a6268; }
  `}
`;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 15px;
  margin-top: 30px;
  width: 100%;
`;

const CalendarDay = styled.div`
  aspect-ratio: 1;
  background: ${props => props.hasPlans ? '#1559ED' : '#f8f9fa'};
  color: ${props => props.hasPlans ? 'white' : '#495057'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  min-height: 60px;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
`;

const DateHeader = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #495057;
  margin-bottom: 20px;
`;