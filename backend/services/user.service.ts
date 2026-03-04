import user from "../model/user.model";

type props =
{
    firstName : string, lastName : string, email : string, password : string
}
export const createUser = async({firstName, lastName, email, password} :props) =>{
    if(!firstName || !lastName|| !email || !password){
        throw new Error("All field are required")
    }
    const createUser = await user.create({
        fullName :{
            firstName,
            lastName
        },
        email,
        password
    })

    return createUser
}