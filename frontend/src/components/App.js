import React, { useState } from 'react';
import {
  Container,
  StyledCard,
  CardContentStyled,
  Title,
  StyledTabs,
  StyledTab,
  ContentArea,
  ResponseArea,
  SubmitButton,
  FeedbackContainer,
} from './App.styles';
import { useRandomQuestion } from '../hooks/useRandomQuestion';
import { extractDescription, formatExamples } from '../utils/descriptionUtils';

function App() {
  const { question, error, refetch } = useRandomQuestion();
  const [activeTab, setActiveTab] = useState('description'); // 'description' or 'examples'
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/grade-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionTitle: question.title, userResponse }),
      });

      const data = await response.json();
      setFeedback(data.feedback); // Set feedback from backend
    } catch (error) {
      console.error('Error submitting response:', error);
      setFeedback('Error: Unable to get feedback.');
    }
  };

  if (error) {
    return (
      <Container>
        <StyledCard>
          <CardContentStyled>
            <Title difficulty="error">Error</Title>
            <p>Unable to load a random question. Please try again later.</p>
          </CardContentStyled>
        </StyledCard>
      </Container>
    );
  }

  if (!question) {
    return (
      <Container>
        <StyledCard>
          <CardContentStyled>
            <Title difficulty="loading">Loading...</Title>
            <p>Fetching a random question. Please wait.</p>
          </CardContentStyled>
        </StyledCard>
      </Container>
    );
  }

  const descriptionText = extractDescription(question.description);
  const examplesContent = formatExamples(question.description);

  return (
    <Container>
      <div style={{ display: 'flex', width: '100%' }}>
        {/* Left Side: Question Content */}
        <StyledCard>
          <CardContentStyled>
            <Title difficulty={question.difficulty}>{question.title}</Title>
            <ContentArea>
              {activeTab === 'description' ? (
                <p>{descriptionText}</p>
              ) : (
                <div>{examplesContent}</div>
              )}
            </ContentArea>
          </CardContentStyled>

          <StyledTabs>
            <StyledTab
              active={(activeTab === 'description').toString()}
              onClick={() => setActiveTab('description')}
            >
              Description
            </StyledTab>
            <StyledTab
              active={(activeTab === 'examples').toString()}
              onClick={() => setActiveTab('examples')}
            >
              Examples
            </StyledTab>
          </StyledTabs>
        </StyledCard>

        {/* Right Side: User Response */}
        <ResponseArea>
          <textarea
            placeholder="Describe your approach here..."
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            style={{ width: '100%', height: '150px', marginBottom: '10px' }}
          />
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>

          {/* Feedback Section */}
          {feedback && (
            <FeedbackContainer>
              <strong>Feedback:</strong>
              <p>{feedback}</p>
            </FeedbackContainer>
          )}
        </ResponseArea>
      </div>

      <SubmitButton onClick={refetch} style={{ marginTop: '20px' }}>
        Next Question
      </SubmitButton>
    </Container>
  );
}

export default App;