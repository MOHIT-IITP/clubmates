import { redirect } from "next/navigation";
import { auth } from "./auth"

export  const RequireUser =  async () => {
    const session = await auth();
    if(!session) {
        return (
            redirect('/signin')
        )
    }
}