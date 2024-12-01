import prisma from "./prismaClient";

export const createbooking = async ( name:string, location:string, description:string, capacity?:number ) => {
    
    try {
        return await prisma.booking.create({
            data: { name, location, capacity, description},
        });
    } catch (error) {
        return {
            error: error,
            msg: "Error Creating booking"
        }
    }
}

export const getAllbookings = async () => {
    return await prisma.booking.findMany();
}

export const findbooking = async ( id?:number, name?:string, capacity?:number ) => {
    
    try {
        if( !id && !name && !capacity ){
            return {msg: "No Parameters Given"}
        }else if(!capacity){
            let booking = await prisma.booking.findMany({where: {
                ...(id && { id }),
                ...(name && { name }),
            }})
            if(!booking){
                return {msg: "No booking Found"}
            }
            return booking
        }else{
            let booking = await prisma.booking.findMany({where: {
                ...(id && { id }),
                ...(name && { name }),
                capacity: {gte: capacity}
            }})
            if(!booking){
                return {msg: "No booking Found"}
            }
            return booking
        }
    } catch (error) {
        return {
            error: error,
            msg: "Error Finding booking"
        } 
    }
}

export const updatebooking = async ( id:number, name?:string, location?:string, capacity?:number, description?:string ) => {

    try {
        if( !location && !name && !capacity && !description ){
            return {msg: "No Parameters To Update"}
        }else{
            let booking = await prisma.booking.findFirst({where: {id: id}})
            if(!booking){
                return {msg: "No booking To Update"}
            }
            await prisma.booking.update({
                where: {id: booking.id},
                data: {
                    ...(name && {name}),
                    ...(location && {location}),
                    ...(capacity && {capacity}),
                    ...(description && {description})
                }
            })
            return {msg: "booking Successfully Updated"}
        }
    } catch (error) {
        return {
            error: error,
            msg: "Error Updating booking"
        } 
    }
}

export const deletebooking = async ( id:number ) => {

    try {
        let booking = await prisma.booking.findFirst({where: {id: id}})
        if(!booking){
            return {msg: "No booking To Delete"}
        }
        await prisma.booking.delete({
            where: {id : booking.id}
        })
        return {msg: "booking Successfully Deleted"}
    } catch (error) {
        return {
            error: error,
            msg: "Error Deleting booking"
        } 
    }
}
