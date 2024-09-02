'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import getStripe from "@/utils/getstripe"
import { useSearchParams } from "next/navigation"

const ResultPage = ()=>{
  const router = useRouter()
  const searchParams = useSearchParams()
  const session_id = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [session, setSession] =  useState(true)
}