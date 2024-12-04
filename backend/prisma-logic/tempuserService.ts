import prisma from "./prismaClient";

export const createTempuser = async ( name:string, email: string, password:string, token:string ) => {
    try {
        return await prisma.tempuser.create({
            data: {
                name,
                email,
                password,
                token
            }
        })
    } catch (error) {
        return {
            error: error,
            msg: "Error Creating TempUSer"
        }
    }
}

export const findTempuser = async ( name:string, email: string, password:string, token:string ) => {
    try {
        return await prisma.tempuser.findFirst({
            where: {
                name,
                password,
                email,
                token
            }
        })
    } catch (error) {
        return {
            error: error,
            msg: "Error Getting TempUSer"
        }
    }
}

export const deleteTempuser = async ( id:number ) => {
    
}