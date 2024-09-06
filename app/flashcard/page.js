'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { doc, collection, getDocs } from 'firebase/firestore';
import theme from '../components/theme';
import Navbar from '@/app/components/navbar';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  ThemeProvider,
  Typography,
  CardActionArea,
  CardContent,
  Grid,
  Card,
  Container,
  Divider,
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import Footer from '../components/footer';

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  // get all flashcards
  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, 'users'), user.id), search);
      const docs = await getDocs(colRef);
      console.log(docs); //test
      const flashcards = [];

      // loop through the doc to get hold of cards
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });

      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);
  // hanlde card click
  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev, // keep not concerned cards the same
      [id]: !prev[id], //target card flip it
    }));
  };

  // check if user or page is loaded
  if (!isLoaded || !isSignedIn) {
    return <>loading...</>;
  }

  // ------------------- ui --------------------
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: theme.custom.subpageBackground,
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Container>
          <Box sx={{ mt: 4 }}>
            {/* Title for the Collection */}
            <Typography
              variant="h4"
              component="h2"
              sx={{
                textAlign: 'center',
                fontFamily: 'Mina',
                fontSize: '40px',
                fontStyle: 'normal',
                fontWeight: 700,
              }}
            >
              Cards saved in the Collection <em>{search}</em>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Divider sx={{ bgcolor: 'primary.main', width: 800 }} />
            </Box>
            {/* dispaly cards */}
            <Grid
              container
              spacing={4}
              justifyContent="center"
              sx={{
                mt: 4,
              }}
            >
              {flashcards.map((flashcard, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  sx={{ mb: 4 }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      aspectRatio: '1/1',
                      backgroundColor: 'primary.yellow',
                    }}
                  >
                    <CardActionArea onClick={() => handleCardClick(index)}>
                      <CardContent
                        sx={{
                          position: 'relative',
                          perspective: '1000px',
                          padding: 0,
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            overflowY: 'auto',
                            // height: 0,
                            paddingBottom: '100%',
                            position: 'relative',
                            backgroundColor: 'primary.light_purple',
                            '& > div': {
                              transition: 'transform 0.6s',
                              transformStyle: 'preserve-3d',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)',
                              transform: flipped[index]
                                ? 'rotateY(180deg)'
                                : 'rotateY(0deg)',
                            },
                            '& > div > div': {
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              backfaceVisibility: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '16px',
                              boxSizing: 'border-box',
                            },
                            '& > div > div:nth-of-type(2)': {
                              transform: 'rotateY(180deg)',
                            },
                          }}
                        >
                          <div>
                            <div>
                              <QuizIcon sx={{ alignSelf: 'flex-start' }} />
                              <Typography
                                variant="h6"
                                component="div"
                                sx={{ fontFamily: 'Lato' }}
                              >
                                {flashcard.front}
                              </Typography>
                            </div>
                            <div>
                              <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                  fontFamily: 'Lato',
                                }}
                              >
                                {flashcard.back}
                              </Typography>
                            </div>
                          </div>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}