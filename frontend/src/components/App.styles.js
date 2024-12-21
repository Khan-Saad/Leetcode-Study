import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export const Container = styled(Box)(({ theme }) => ({
  height: '100vh',
  backgroundColor: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(4),
  fontFamily: "'Poppins', sans-serif",
  overflowY: 'auto',
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '15px',
  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '75vh', // Adjusted height to leave space for the button
  position: 'relative',
}));

export const CardContentStyled = styled(CardContent)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(4),
  textAlign: 'left',
  fontFamily: "'Poppins', sans-serif",
}));

export const Title = styled(Typography)(({ theme, difficulty }) => {
  let color;

  switch (difficulty?.toLowerCase()) {
    case 'easy':
      color = '#a8e6cf';
      break;
    case 'medium':
      color = '#ffd3b6';
      break;
    case 'hard':
      color = '#ffaaa5';
      break;
    default:
      color = '#ccc';
  }

  return {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color,
    fontFamily: "'Poppins', sans-serif",
  };
});

export const StyledTabs = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: '#f1f1f1',
  borderTop: '1px solid #ddd',
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
  color: active ? '#007bff' : '#555',
  borderBottom: active ? '2px solid #007bff' : 'none',
  '&:hover': {
    backgroundColor: '#f9f9f9',
  },
}));

export const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto', // Enable scrolling for long content
  padding: theme.spacing(2),
  lineHeight: '1.6',
  fontFamily: "'Poppins', sans-serif",
}));

export const NextButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#007bff',
  color: '#fff',
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
  fontSize: '1rem',
  fontFamily: "'Poppins', sans-serif",
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out', // Animation on hover
  '&:hover': {
    backgroundColor: '#0056b3',
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
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#007bff',
  color: '#fff',
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  fontSize: '1rem',
  fontFamily: "'Poppins', sans-serif",
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
}));

export const FeedbackContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#f1f1f1',
  borderRadius: '5px',
  fontFamily: "'Poppins', sans-serif",
  lineHeight: '1.5',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
}));