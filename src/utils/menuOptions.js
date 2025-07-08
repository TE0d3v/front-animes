import { TbMovie } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";

export const menuOptions = [
    {
        label: 'Animes',
        icon: <TbMovie />,
        path: '/animes',
        enable: [
            'admin',
            'user'
        ]
    },
    {
        label: 'Usuários',
        icon: <FaUsers />,
        path: '/users',
        enable: [
            'admin'
        ]
    }
]