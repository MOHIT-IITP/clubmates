import Link from "next/link";

const Profile = () => {
  return (
    <div>
      <Link href={"/login"}>
        <div className="px-4 py-2 border border-gray-300  rounded-xl text-black bg-white hover:shadow-md hover:bg-gray-100 shadow-xl ">
          Admin
        </div>
      </Link>
    </div>
  );
};

export default Profile;
