import { useState } from 'react';
import useUser from '../hooks/useUser';
import usePageInsights from '../hooks/usePageInsights';
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Alert,
  TextField,
  Grid,
  Container,
  Box,
} from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import { styled } from '@mui/system';

const Header = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const ProfileImage = styled('img')(() => ({
  width: 100,
  borderRadius: '50%',
  margin: '0',
  display: 'block',
}));

const DateField = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Home = () => {
  const { user } = useUser();
  const [selectedPage, setSelectedPage] = useState(
    import.meta.env.VITE_PAGE_ID
  );
  const [since, setSince] = useState('2024-08-20');
  const [until, setUntil] = useState('2024-08-30');

  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  const { followers, engagement, impressions, reactions, pageName, isError } =
    usePageInsights(selectedPage, accessToken, since, until);

  const handlePageChange = (event) => {
    setSelectedPage(event.target.value);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'since') {
      setSince(value);
    } else if (name === 'until') {
      setUntil(value);
    }
  };

  if (!user) return <CircularProgress />;

  const isLoading =
    followers.isLoading ||
    engagement.isLoading ||
    impressions.isLoading ||
    reactions.isLoading ||
    pageName.isLoading;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />

      <Container maxWidth="md" sx={{ flexGrow: 1 }}>
        <Header className="flex justify-evenly items-center my-5">
          <Typography variant="h4">Hi {user?.username}</Typography>
          {user?.pfp && (
            <ProfileImage src={user.pfp} alt={`${user.username}'s profile`} />
          )}
        </Header>

        <Select
          value={pageName?.data?.name || ''}
          onChange={handlePageChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Page' }}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select Page
          </MenuItem>
          {pageName?.data?.name && (
            <MenuItem value={pageName?.data?.name}>
              {pageName?.data?.name}
            </MenuItem>
          )}
        </Select>

        <DateField container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Since"
              type="date"
              name="since"
              value={since}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Until"
              type="date"
              name="until"
              value={until}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
        </DateField>

        {selectedPage && (
          <div>
            {isLoading ? (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
              </Box>
            ) : (
              <div>
                {isError && (
                  <Alert severity="error">Error fetching page insights.</Alert>
                )}
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6">Total Followers / Fans</Typography>
                    <Typography variant="body1">
                      {followers.data?.data?.[0]?.values?.[0]?.value?.toString() ||
                        'N/A'}
                    </Typography>
                  </CardContent>
                </StyledCard>
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6">Total Engagement</Typography>
                    <Typography variant="body1">
                      {engagement.data?.data?.[0]?.values?.[0]?.value?.toString() ||
                        'N/A'}
                    </Typography>
                  </CardContent>
                </StyledCard>
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6">Total Impressions</Typography>
                    <Typography variant="body1">
                      {impressions.data?.data?.[0]?.values?.[0]?.value?.toString() ||
                        'N/A'}
                    </Typography>
                  </CardContent>
                </StyledCard>
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6">Total Reactions</Typography>
                    <Typography variant="body1">
                      {reactions.data?.data?.[0]?.values?.[0]?.value?.toString() ||
                        'N/A'}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </div>
            )}
          </div>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default Home;
