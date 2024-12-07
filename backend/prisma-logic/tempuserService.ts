import prisma from "./prismaClient";

export const createTempuser = async ( name:string, email: string, password:string, token:string ) => {
    try {
        return await prisma.tempuser.create({
            data: {
                name,
                email,
                password,
                token,
                expiresAt:  new Date(Date.now() + 30 * 60 * 1000),

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
    try {
        prisma.tempuser.delete({
            where: {
                id
            }
        })
        return {msg: "Success"}
    } catch (error) {
        return {
            error: error,
            msg: "Error Deleting TempUser"
        }
    }
}

export const deleteExpiredUser = async () => {
    try {
        prisma.tempuser.deleteMany({
            where:{
                expiresAt: { lt: new Date() }
            }
        })
    } catch (error) {
        return {
            error: error,
            msg: "Error Deleting TempUser"
        }
    }
}