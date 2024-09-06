"use client";
import React from "react";
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <Container sx={{height: "100vh"}}>
      <AppBar
        position="static"
        sx={{
          backgroundImage: `url('/images/brown_image.jpg')`, // Replace with the path relative to the public directory
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Toolbar>
          <Image src="/images/logo.webp" width={50} height={50} alt="FlashMind AI"></Image>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer", ml: 2 }}
            onClick={handleClick}
          >
            FlashMind AI
          </Typography>
          <Button color="inherit">
            <Link href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: "center", my: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </Container>
  );
}