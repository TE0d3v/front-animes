import CardAnime from "@/components/CardAnime"
import ModalCreateAnimes from "@/components/ModalCreateAnimes"
import PageWrapper from "@/components/PageWrapper"
import instance from "@/instance/api"
import { useEffect, useState } from "react"

export default function Animes() {
    const [animes, setAnimes] = useState([])
    const [openModal, setOpenModal] = useState(false)


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
            const response = await instance.post('/animes', animeData)
            setAnimes([...animes, response.data])
        } catch (error) {
            console.error("Erro ao criar anime:", error);
            // Aqui você pode adicionar lógica para lidar com erros, como exibir uma mensagem de erro ao usuário
        }
    }

    return (
        <PageWrapper>
            <div className="w-full flex justify-end">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
                    onClick={() => setOpenModal(true)}
                >
                    Adicionar Anime
                </button>
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