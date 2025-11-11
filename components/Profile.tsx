import { auth } from "@/lib/auth";
import Link from "next/link";

const Profile = async () => {
  const session = await auth();
  if (!session) {
    return (
      <div>
        <Link href={"/sign-in"}>
          <div className="px-4 py-2 border border-gray-300  rounded-xl text-black bg-white hover:shadow-md hover:bg-gray-100 shadow-xl ">
            Login
          </div>
        </Link>
      </div>
    );
  }
};

export default Profile;
