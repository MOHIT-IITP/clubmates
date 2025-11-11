import { executeAction } from "./executeAction"
import { schema } from "./schema";
import {prisma}  from "./db"

const singUp= async (formadata : FormData)=>{
     return executeAction({
          actionFn: async()=>{
               const email = formadata.get("email");
               const password = formadata.get("password");
               const validateData = schema.parse({email,password});

               await prisma.user.create({

                    data: {
                         email: validateData.email.toLowerCase(),
                         password: validateData.password,
                    }

               })
          }
     })
}

export {singUp};