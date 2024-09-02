"use client";
import getStripe from "@/utils/getstripe";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

const buttonStyle = {
  color: '#ffffff', // Button text color
  backgroundColor: '#3f51b5', // Background color matching the heading
  '&:hover': {
    backgroundColor: '#303f9f', // Slightly darker shade for hover effect
  },
};

const pricingButtonStyle = {
  color: '#ffffff',
  backgroundColor: '#3f51b5',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
  marginTop: '16px', // Adjust spacing as needed
};

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
            <Typography variant="h6" style={{ flexGrow: 1, color: '#3f51b5' }}>
              Flashcard SaaS
            </Typography>
            <Box display="flex" alignItems="center">
              <SignedOut>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {/* SignInButton component */}
                  <SignInButton>
                    <Button sx={buttonStyle}>Sign In</Button>
                  </SignInButton>
                  {/* SignUpButton component */}
                  <SignUpButton>
                    <Button sx={buttonStyle}>Sign Up</Button>
                  </SignUpButton>
                </Box>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Box>
          </Toolbar>
        </AppBar>
        <Head>
          <title>Flashcard SaaS</title>
          <meta name="description" content="Create flashcards from your text" />
        </Head>
      </Container>
      <Container maxWidth="100vw">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={4}>
          <Typography variant="h2" gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" gutterBottom>
            The easiest way to make flashcards from your text
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/flashcards">
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
                flashcards. Perfect for studying.
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
        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Basic Plan
                </Typography>
                <Typography variant="h5" gutterBottom>
                  $5 / month
                </Typography>
                <Typography>
                  Access to basic features and limited storage.
                </Typography>
                <Button variant="contained" sx={pricingButtonStyle}>
                  Choose Basic
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Pro Plan
                </Typography>
                <Typography variant="h5" gutterBottom>
                  $10 / month
                </Typography>
                <Typography>
                  Unlimited flashcards and unlimited storage.
                </Typography>
                <Button variant="contained" sx={pricingButtonStyle} onclick={handleSubmit}>
                  Choose Pro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
