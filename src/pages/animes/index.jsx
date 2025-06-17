import PageWrapper from "@/components/PageWrapper"
import instance from "@/instance/api"
import { useRouter } from "next/router"
import { Children, useEffect, useState } from "react"

export default function Animes(){
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem('token')

        if(!token){
            router.push('/')
        }

        async function heartBeat() {
            try{
                await instance.get('/heartbeat')
            }catch(error){
                router.push('/')
            }
        }

        heartBeat()
        // Simula um delay para mostrar o loading
        setLoading(false)
    }, [])
    
    return(
        <PageWrapper>
            <p>OLá mundo</p>
        </PageWrapper>
    )
}