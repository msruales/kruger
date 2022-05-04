
export const userAdapter = ( user: any) => ({
    id: user.id,
    names: user.name,
    email: user.email,
    rol: user.rol
})
