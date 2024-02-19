import { Id } from "../Types/types"


export interface Members {
    id:Id,
    name:string,
    avatar_path:string
}

export const members:Members[]=[
    {
        id:1,
        name:"Avatar1",
        avatar_path:'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&uid=R108084311&ga=GA1.1.609998463.1707891704&semt=sph'
    },
    {
        id:2,
        name:"Avatar2",
        avatar_path:'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100151.jpg?size=626&ext=jpg&uid=R108084311&ga=GA1.1.609998463.1707891704&semt=sph'
    },
    {
        id:3,
        name:"Avatar3",
        avatar_path:'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100253.jpg?size=626&ext=jpg&uid=R108084311&ga=GA1.1.609998463.1707891704&semt=sph'
    },
    {
        id:4,
        name:"Avatar4",
        avatar_path:'https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034097.jpg?size=626&ext=jpg&uid=R108084311&ga=GA1.1.609998463.1707891704&semt=sph'
    }
]