import CardAnime from "@/components/CardAnime"
import ModalCreateAnimes from "@/components/ModalCreateAnimes"
import PageWrapper from "@/components/PageWrapper"
import useUserData from "@/hooks/use-user-data"
import instance from "@/instance/api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Animes() {
    const [animes, setAnimes] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const user = useUserData()

    useEffect(() => {
        async function getAnimes() {
            try {
                const response = await instance.get('/animes')

                setAnimes(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getAnimes()
    }, [])

    async function createAnime(animeData) {
        try {
            const response = await instance.post(
                '/animes',
                animeData
            )

            setAnimes([...animes, response.data])
            setOpenModal(false)
            toast.success("Anime criado com sucesso!")
        } catch (error) {
            toast.error("Erro ao criar anime")
            console.log(error)
        }
    }

    return (
        <PageWrapper>
            <div className="w-full flex justify-end mb-4">
                {user?.role === 'admin' && (
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
                        onClick={() => setOpenModal(true)}
                    >
                        Adicionar Anime
                    </button>
                )}
            </div>
            <div className="grid grid-cols-4 gap-4">
                {animes.map((anime) => {
                    return (
                        <CardAnime anime={anime} />
                    )
                })}
            </div>
            <ModalCreateAnimes
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={createAnime}
            />
        </PageWrapper>
    )
}