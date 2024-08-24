'use client'

import { useUser } from '@clerk/nextjs';
import { useEffect, useState} from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import { useSearchParams } from 'next/navigation';

export default function Flashcard(){
  const { isLoaded, isSignedIn, user } = useUser(); // Destructure useUser hook
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const SearchParams = useSearchParams();
  const search = searchParams.get('id')

  useEffect(()=>{
    async function getFlashcard(){
      if (!search || !user) return
      const docRef = doc(collection(db, 'users' ), user.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()){
        const collections = docSnap.data().flashcards || []
        setFlashcards(collections)
      }
      else{
        await setDoc(docRef, {flashcards: []})
      }
    }
    getFlashcard()
  }, {user})
}