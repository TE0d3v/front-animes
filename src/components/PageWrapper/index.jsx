import instance from "@/instance/api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Header from "../Header"

export default function PageWrapper({ children }) {

    const router = useRouter()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/')
        }

        async function heartBeat() {
            try {
                await instance.get('/heartbeat')
            } catch (error) {
                localStorage.removeItem('token')
                router.push('/')
            }
        }

        heartBeat()
        // Simula um delay para mostrar o loading
        setLoading(false)
    }, [])

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <div className="w-full h-full pt-[65px]">
            {children}
            </div>
        </div>
    )
}