import prisma from "./prismaClient";

export const createbooking = async ( name:string, purpose:string, startTimeString:string, endTimeString: string, userId: number, auditoriumId: number) => {
    
    try {
        let  startTime = new Date(startTimeString);
        let endTime =  new Date(endTimeString);
        return await prisma.booking.create({
            data: { name, purpose, startTime, endTime, user:  { connect: { id: userId } }, auditorium: { connect: { id: auditoriumId} } }
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

export const findbooking = async ( id?:number, name?:string, userId?:number, auditoriumId?:number, startTimeString:string = '', endTimeString:string= '') => {

    
    try {
        if( !id && !name && !userId && !auditoriumId && startTimeString == '' && endTimeString == ''){
            return {msg: "No Parameters Given"}
        }else{
            let startTime = startTimeString ? new Date(startTimeString) : null
            let endTime = endTimeString ? new Date(endTimeString) : null
            let booking = await prisma.booking.findMany({where: startTime && endTime ?{
                ...(id && { id }),
                ...(name && { name }),
                ...(userId && { user: { id: userId } }),
                ...(auditoriumId && { auditorium: { id: auditoriumId } }),
                startTime: {gte: startTime},
                endTime: {gte: endTime}
            } : startTime ?
            {
                ...(id && { id }),
                ...(name && { name }),
                ...(userId && { user: { id: userId } }),
                ...(auditoriumId && { auditorium: { id: auditoriumId } }),
                startTime: {gte: startTime}
            } : endTime ? {
                ...(id && { id }),
                ...(name && { name }),
                ...(userId && { user: { id: userId } }),
                ...(auditoriumId && { auditorium: { id: auditoriumId } }),
                endTime: {gte: endTime}
            }: {
                ...(id && { id }),
                ...(name && { name }),
                ...(userId && { user: { id: userId } }),
                ...(auditoriumId && { auditorium: { id: auditoriumId } }),
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

export const updatebooking = async ( id:number, name?:string, purpose?:string, startTimeString:string = '', endTimeString:string= '' ) => {

    try {
        if( !purpose && !name && startTimeString == '' && endTimeString == '' ){
            return {msg: "No Parameters To Update"}
        }else{
            let booking = await prisma.booking.findFirst({where: {id: id}})
            if(!booking){
                return {msg: "No booking To Update"}
            }
            let startTime = startTimeString ? new Date(startTimeString) : null
            let endTime = endTimeString ? new Date(endTimeString) : null
            await prisma.booking.update({
                where: {id: booking.id},
                data: {
                    ...(name && {name}),
                    ...(purpose && {purpose}),
                    ...(startTime && {startTime}),
                    ...(endTime && {endTime})
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
