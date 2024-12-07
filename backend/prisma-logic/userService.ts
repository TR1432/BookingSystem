import prisma from "./prismaClient"
import bcrypt  from "bcrypt"


export const createUser = async (name: string, email: string, password: string) => {
    try {
      password = await bcrypt.hash(password, 10)
      return await prisma.user.create({
        data: { name, email, password},
      });
    } catch (error) {
        return {
            error: error,
            msg: "Error Creating User"
        }
    }
}

export const getAllUsers = async () => {
    return await prisma.user.findMany();
}

const findUser = async (criteria: {id?:number; name?: string; email?: string; password?: string }) => {
    const { id, name, email, password } = criteria;
    return await prisma.user.findFirst({
      where: {
        ...(id && {id}),
        ...(name && { name }),
        ...(email && { email }),
        password,
      },
    });
  }; 

export const getUser = async (id?: number, name?: string, email?: string) => {
  try {
    if ((!name && !email && !id)) {
      return { error: 'No parameters sent' };
    }

    return await findUser({ id, name, email});
  } catch (error) {
    return {
      error,
      msg: 'Error fetching user',
    };
  }
};


export const updateUser = async (id: number, name?: string, email?: string, password?: string) => {
    try {
        if ((!name && !email && !id) || !password) {
            return { error: 'No parameters To Update' };
          }
        const user = await findUser({ id });
        if(!user){
            return {error: "User Not Found"}
        }
        prisma.user.update({
            where: { id : user.id},
            data: {
                ...(name && {name}),
                ...(email && {email}),
                ...(password && {password : await bcrypt.hash(password, 10)})
            }
        })
        return {msg: "User Successfully Updated"}
    } catch (error) {
        return {
            error,
            msg: 'Error Updating user',
        };
    }
}

export const deleteUser = async (id:number) => {
    try {
        let user = await findUser({id})
        if(!user){
            return {error: "User NOt Found"}
        }
        await prisma.user.delete({
            where: {id : user.id}
        })
        return {msg: "User Successfully Deleted"}
    } catch (error) {
        return {
            error,
            msg: 'Error Deleting user',
        };
    }
}