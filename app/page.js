"use client";
import getStripe from "@/utils/getstripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSessionJson.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <>
      <Container maxWidth="100vw" disableGutters>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Flashcard SaaS
            </Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in">
                Login
              </Button>
              <Button color="inherit" href="/sign-up">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>
        <Head>
          <title>Flashcard SaaS</title>
          <meta name="description" content="Create flashcards from your text" />
        </Head>
      </Container>
      <Container maxWidth="100vw">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" gutterBottom>
            The easiest way to make flashcards from your text
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            href="/flashcards"
          >
            Get Started!
          </Button>
        </Box>
        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Easy Text Input
              </Typography>
              <Typography>
                Simply input your text and let our software do the rest!
                Creating flashcards has never been easier.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Smart Flashcards
              </Typography>
              <Typography>
                Our AI intelligently breaks down your text into concise
                flashcards. Perfect for studying
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Accessible Anywhere
              </Typography>
              <Typography>
                Access your flashcards from any device, at any time! Study on
                the go with ease.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        
                
              
            
          
      </Container>
    </>
  );
}