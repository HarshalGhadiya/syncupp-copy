"use client"

import FileDashboard from "@/app/shared/file/dashboard"
import { getUserProfile } from "@/redux/slices/user/auth/signinSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"



export default function DashboardPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    return(
        <>
            <FileDashboard />
        
        </>
    )

}