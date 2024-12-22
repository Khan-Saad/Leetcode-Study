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
  LoadingContainer,
  Spinner,
  LoadingText,
  SolutionArea,
  FeedbackTabs,
  FeedbackTab,
  Quote,
  GlobalStyle,
} from './App.styles';
import { useRandomQuestion } from '../hooks/useRandomQuestion';
import ReactMarkdown from 'react-markdown';

function App() {
  const { question, error, refetch } = useRandomQuestion();
  const [activeTab, setActiveTab] = useState('description'); // 'description' or 'examples'
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeedbackTab, setActiveFeedbackTab] = useState('feedback'); // 'feedback' or 'solution'
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
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
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting response:', error);
      setFeedback('Error: Unable to get feedback.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = async () => {
    setLoadingQuestion(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure loading lasts at least 0.5 seconds
    await refetch();
    setUserResponse('');
    setFeedback('');
    setActiveFeedbackTab('feedback');
    setSubmitted(false);
    setLoadingQuestion(false);
  };

  const renderLoading = () => (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );

  const renderError = () => (
    <Container>
      <StyledCard>
        <CardContentStyled>
          <Title difficulty="error">Error</Title>
          <p>Unable to load a random question. Please try again later.</p>
        </CardContentStyled>
      </StyledCard>
    </Container>
  );

  const renderQuestionContent = () => (
    <StyledCard style={{ position: 'relative' }}>
      {loadingQuestion && renderLoading()}
      <CardContentStyled>
        <Title difficulty={question.difficulty}>{question.title}</Title>
        <ContentArea>
          {activeTab === 'description' ? (
            <ReactMarkdown>{question.description}</ReactMarkdown>
          ) : (
            <ReactMarkdown>{question.examples}</ReactMarkdown>
          )}
        </ContentArea>
      </CardContentStyled>

      <StyledTabs>
        <StyledTab
          active={activeTab === 'description'}
          onClick={() => setActiveTab('description')}
        >
          Description
        </StyledTab>
        <StyledTab
          active={activeTab === 'examples'}
          onClick={() => setActiveTab('examples')}
        >
          Examples
        </StyledTab>
      </StyledTabs>
    </StyledCard>
  );

  const renderResponseArea = () => (
    <ResponseArea style={{ position: 'relative' }}>
      {loading && renderLoading()}
      <textarea
        placeholder="Describe your approach here..."
        value={userResponse}
        onChange={(e) => setUserResponse(e.target.value)}
        style={{ width: '100%', height: '150px', marginBottom: '10px' }}
      />
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>

      {submitted ? (
        <>
          <FeedbackTabs>
            <FeedbackTab
              active={activeFeedbackTab === 'feedback'}
              onClick={() => setActiveFeedbackTab('feedback')}
            >
              Feedback
            </FeedbackTab>
            <FeedbackTab
              active={activeFeedbackTab === 'solution'}
              onClick={() => setActiveFeedbackTab('solution')}
            >
              Solution
            </FeedbackTab>
          </FeedbackTabs>

          {activeFeedbackTab === 'feedback' && feedback && (
            <FeedbackContainer>
              <strong>Feedback:</strong>
              <p>{feedback}</p>
            </FeedbackContainer>
          )}

          {activeFeedbackTab === 'solution' && (
            <SolutionArea>
              <pre>
                <code>
{`function helloWorld() {
  console.log("Hello, World!");
}`}
                </code>
              </pre>
            </SolutionArea>
          )}
        </>
      ) : (
        <div style={{ marginTop: '20px', textAlign: 'center', color: '#555' }}>
          <Quote />
        </div>
      )}
    </ResponseArea>
  );

  if (error) return renderError();
  if (!question) return renderLoading();

  return (
    <>
      <GlobalStyle />
      <Container>
        <div style={{ display: 'flex', width: '100%' }}>
          {renderQuestionContent()}
          {renderResponseArea()}
        </div>
        <SubmitButton onClick={handleNextQuestion} style={{ marginTop: '20px' }}>
          Next Question
        </SubmitButton>
      </Container>
    </>
  );
}

export default App;