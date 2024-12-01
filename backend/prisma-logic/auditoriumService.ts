import prisma from "./prismaClient";

export const createAuditorium = async ( name:string, location:string, description:string, capacity?:number ) => {
    
    try {
        return await prisma.auditorium.create({
            data: { name, location, capacity, description},
        });
    } catch (error) {
        return {
            error: error,
            msg: "Error Creating Auditorium"
        }
    }
}

export const getAllAuditoriums = async () => {
    return await prisma.auditorium.findMany();
}

export const findAuditorium = async ( id?:number, name?:string, capacity?:number ) => {
    
    try {
        if( !id && !name && !capacity ){
            return {msg: "No Parameters Given"}
        }else if(!capacity){
            let auditorium = await prisma.auditorium.findMany({where: {
                ...(id && { id }),
                ...(name && { name }),
            }})
            if(!auditorium){
                return {msg: "No Auditorium Found"}
            }
            return auditorium
        }else{
            let auditorium = await prisma.auditorium.findMany({where: {
                ...(id && { id }),
                ...(name && { name }),
                capacity: {gte: capacity}
            }})
            if(!auditorium){
                return {msg: "No Auditorium Found"}
            }
            return auditorium
        }
    } catch (error) {
        return {
            error: error,
            msg: "Error Finding Auditorium"
        } 
    }
}

export const updateAuditorium = async ( id:number, name?:string, location?:string, capacity?:number, description?:string ) => {

    try {
        if( !location && !name && !capacity && !description ){
            return {msg: "No Parameters To Update"}
        }else{
            let auditorium = await prisma.auditorium.findFirst({where: {id: id}})
            if(!auditorium){
                return {msg: "No Auditorium To Update"}
            }
            await prisma.auditorium.update({
                where: {id: auditorium.id},
                data: {
                    ...(name && {name}),
                    ...(location && {location}),
                    ...(capacity && {capacity}),
                    ...(description && {description})
                }
            })
            return {msg: "Auditorium Successfully Updated"}
        }
    } catch (error) {
        return {
            error: error,
            msg: "Error Updating Auditorium"
        } 
    }
}

export const deleteAuditorium = async ( id:number ) => {

    try {
        let auditorium = await prisma.auditorium.findFirst({where: {id: id}})
        if(!auditorium){
            return {msg: "No Auditorium To Delete"}
        }
        await prisma.auditorium.delete({
            where: {id : auditorium.id}
        })
        return {msg: "Auditorium Successfully Deleted"}
    } catch (error) {
        return {
            error: error,
            msg: "Error Deleting Auditorium"
        } 
    }
}
