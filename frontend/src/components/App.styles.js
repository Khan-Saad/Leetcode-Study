import { styled } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const darkMode = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#BB86FC',
  secondary: '#03DAC6',
  error: '#CF6679',
  onPrimary: '#000000',
  onSecondary: '#000000',
  onBackground: '#FFFFFF',
  onSurface: '#FFFFFF',
  onError: '#000000',
};

export const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background-color: ${darkMode.background};
    color: ${darkMode.onBackground};
    font-family: 'Poppins', sans-serif;
  }
`;

export const Container = styled(Box)(({ theme }) => ({
  height: '100vh',
  backgroundColor: darkMode.background,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(4),
  fontFamily: "'Poppins', sans-serif",
  overflowY: 'auto',
  color: darkMode.onBackground,
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: darkMode.surface,
  borderRadius: '15px',
  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '75vh', // Adjusted height to leave space for the button
  position: 'relative',
  color: darkMode.onSurface,
}));

export const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(4),
  textAlign: 'left',
  fontFamily: "'Poppins', sans-serif",
  color: darkMode.onSurface,
}));

export const Title = styled(Typography)(({ theme, difficulty }) => {
  let color;

  switch (difficulty?.toLowerCase()) {
    case 'easy':
      color = darkMode.secondary;
      break;
    case 'medium':
      color = darkMode.primary;
      break;
    case 'hard':
      color = darkMode.error;
      break;
    default:
      color = darkMode.onSurface;
  }

  return {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color,
    fontFamily: "'Poppins', sans-serif",
  }; // Add missing semicolon here
});

export const StyledTabs = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: darkMode.surface,
  borderTop: `1px solid ${darkMode.onSurface}`,
  padding: theme.spacing(1, 0),
  position: 'absolute',
  bottom: 0,
  width: '100%',
}));

export const StyledTab = styled(Button)(({ theme, active }) => ({
  flex: 1,
  textTransform: 'none',
  fontWeight: active ? 'bold' : 'normal',
  fontFamily: "'Poppins', sans-serif",
  color: active ? darkMode.primary : darkMode.onSurface,
  borderBottom: active ? `2px solid ${darkMode.primary}` : 'none',
  '&:hover': {
    backgroundColor: darkMode.surface,
  },
}));

export const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto', // Enable scrolling for long content
  padding: theme.spacing(2),
  lineHeight: '1.6',
  fontFamily: "'Poppins', sans-serif",
  color: darkMode.onSurface,
}));

export const NextButton = styled(Button)(({ theme }) => ({
  backgroundColor: darkMode.primary,
  color: darkMode.onPrimary,
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
  fontSize: '1rem',
  fontFamily: "'Poppins', sans-serif'",
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out', // Animation on hover
  '&:hover': {
    backgroundColor: darkMode.secondary,
    transform: 'scale(1.1)', // Zoom effect
  },
}));

export const ResponseArea = styled(Box)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: theme.spacing(2),
  backgroundColor: darkMode.surface,
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  color: darkMode.onSurface,
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: darkMode.primary,
  color: darkMode.onPrimary,
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  fontSize: '1rem',
  fontFamily: "'Poppins', sans-serif",
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: darkMode.secondary,
  },
}));

export const FeedbackContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: darkMode.surface,
  borderRadius: '5px',
  fontFamily: "'Poppins', sans-serif",
  lineHeight: '1.5',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  color: darkMode.onSurface,
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(18, 18, 18, 0.8)',
  zIndex: 9999,
}));

export const Spinner = styled(Box)(({ theme }) => ({
  border: `4px solid ${darkMode.surface}`,
  borderRadius: '50%',
  borderTop: `4px solid ${darkMode.primary}`,
  width: '40px',
  height: '40px',
  animation: 'spin 2s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

export const LoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontFamily: "'Poppins', sans-serif",
  fontSize: '1.2rem',
  color: darkMode.primary,
}));

export const SolutionArea = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: darkMode.surface, // Grey background
  borderRadius: '5px',
  fontFamily: "'Poppins', sans-serif",
  lineHeight: '1.5',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  color: darkMode.onSurface,
}));

export const FeedbackTabs = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: darkMode.surface,
  borderTop: `1px solid ${darkMode.onSurface}`,
  padding: theme.spacing(1, 0),
  width: '100%',
  marginTop: theme.spacing(2),
}));

export const FeedbackTab = styled(Button)(({ theme, active }) => ({
  flex: 1,
  textTransform: 'none',
  fontWeight: active ? 'bold' : 'normal',
  fontFamily: "'Poppins', sans-serif",
  color: active ? darkMode.primary : darkMode.onSurface,
  borderBottom: active ? `2px solid ${darkMode.primary}` : 'none',
  '&:hover': {
    backgroundColor: darkMode.surface,
  },
}));

export const Quote = styled(Typography)(({ theme }) => ({
  fontSize: '2.2rem', // Larger font size
  fontFamily: "'Poppins', sans-serif",
  opacity: 0.1, // More translucent font
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Artsy shadow effect
  margin: theme.spacing(2, 0),
  color: darkMode.onSurface,
  '&::before': {
    content: '"The only limit to our realization of tomorrow is our doubts of today."',
    display: 'block',
    textAlign: 'center',
  },
}));

export default GlobalStyle;