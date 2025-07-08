import instance from "@/instance/api"
import { useRouter } from "next/router"
import { use, useEffect, useState } from "react"
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
                const user = await instance.get('/profile')

                localStorage.setItem(
                    'user',
                    JSON.stringify(user.data)
                )
            } catch (error) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                router.push('/')
            }
        }

        heartBeat()
        setLoading(false)
    }, [])

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <div className="w-full h-full pt-[75px] px-8 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
                {children}
            </div>
        </div>
    )
}