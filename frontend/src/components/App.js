import React, { useState, useEffect } from 'react';
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
  StyledSelect,
  StyledInputLabel,
} from './App.styles';
import { useRandomQuestion } from '../hooks/useRandomQuestion';
import ReactMarkdown from 'react-markdown';
import { MenuItem, FormControl, Checkbox, ListItemText } from '@mui/material';

function App() {
  const { question, error, refetch } = useRandomQuestion();
  const [activeTab, setActiveTab] = useState('description'); // 'description' or 'examples'
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeedbackTab, setActiveFeedbackTab] = useState('feedback'); // 'feedback' or 'solution'
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [difficulty, setDifficulty] = useState([]); // 'Easy', 'Medium', 'Hard'
  const [category, setCategory] = useState([]); // Problem categories
  const [categories, setCategories] = useState([]); // All available categories

  useEffect(() => {
    // Define categories here
    setCategories([
      'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting', 'Greedy', 'Depth-First Search', 'Breadth-First Search', 'Tree', 'Binary Search', 'Matrix', 'Two Pointers', 'Bit Manipulation', 'Stack', 'Heap', 'Graph', 'Design', 'Trie', 'Sliding Window', 'Union Find', 'Backtracking', 'Linked List', 'Recursion', 'Divide and Conquer', 'Topological Sort', 'Binary Indexed Tree', 'Segment Tree', 'Queue', 'Minimax', 'Randomized'
    ]);
  }, []);

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
    await refetch(difficulty, category);
    setUserResponse('');
    setFeedback('');
    setActiveFeedbackTab('feedback');
    setSubmitted(false);
    setLoadingQuestion(false);
  };

  const handleDifficultyChange = async (event) => {
    const value = event.target.value;
    setDifficulty(value);
    setLoadingQuestion(true);
    await refetch(value.length ? value : ['All'], category);
    setLoadingQuestion(false);
  };

  const handleCategoryChange = async (event) => {
    const value = event.target.value;
    setCategory(value);
    setLoadingQuestion(true);
    await refetch(difficulty, value.length ? value : ['All']);
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
        <Title difficulty={question.difficulty}>
          <a href={question.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            {question.title}
          </a>
        </Title>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h1>Question App</h1>
          <FormControl variant="outlined" style={{ minWidth: 200, marginRight: 16 }}>
            <StyledInputLabel>Category</StyledInputLabel>
            <StyledSelect
              multiple
              value={category}
              onChange={handleCategoryChange}
              renderValue={(selected) => selected.length ? selected.join(', ') : 'All'}
              label="Category"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 224,
                  },
                },
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  <Checkbox checked={category.indexOf(cat) > -1} />
                  <ListItemText primary={cat} />
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <StyledInputLabel>Difficulty</StyledInputLabel>
            <StyledSelect
              multiple
              value={difficulty}
              onChange={handleDifficultyChange}
              renderValue={(selected) => selected.length ? selected.join(', ') : 'All'}
              label="Difficulty"
            >
              <MenuItem value="Easy">
                <Checkbox checked={difficulty.indexOf('Easy') > -1} />
                <ListItemText primary="Easy" />
              </MenuItem>
              <MenuItem value="Medium">
                <Checkbox checked={difficulty.indexOf('Medium') > -1} />
                <ListItemText primary="Medium" />
              </MenuItem>
              <MenuItem value="Hard">
                <Checkbox checked={difficulty.indexOf('Hard') > -1} />
                <ListItemText primary="Hard" />
              </MenuItem>
            </StyledSelect>
          </FormControl>
        </div>
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