// import { SignOut } from "@/components/sign-out";
// // import { auth } from "@/lib/auth";
// import Image from "next/image";
// import { redirect } from "next/navigation";

// export default async function Dashboard() {
//   // const session = await auth();
//   // console.log(session);
//   // if (!session) {
//   //   redirect("/sign-in");
//   // }
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <nav>
//         <img
//           src={session?.user?.image}
//           alt="Profile Picture"
//           width={100}
//           height={100}
//           className="rounded-full"
//         />
//       </nav>
//       <div className="border-2 border-red-500 ">
//         <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
//         <p>{session?.user?.email}</p>
//       </div>
//     <div className="min-h-screen flex flex-col items-center gap-4 justify-center">
//       <h1 className="text-2xl font-bold">Welcome, Admin 👑</h1>
//       <p>{session?.user?.name}</p>
//       <img
//         src={session?.user?.image}
//         alt="Profile Picture"
//         width={100}
//         height={100}
//         className="rounded-full"
//       />
//       <p>{session?.user?.email}</p>


//       <SignOut />
//     </div>
//   );
// }
import { SignOut } from "@/components/sign-out";

const guestUser = {
  name: "Guest User",
  email: "guest@clubmates.local",
  image: "https://placehold.co/100x100?text=Guest",
};

export default async function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <nav>
        <img
          src={guestUser.image}
          alt="Guest Profile"
          width={100}
          height={100}
          className="rounded-full"
        />
      </nav>

      <div className="border-2 border-red-500 px-6 py-4 text-center rounded-xl">
        <h1 className="text-2xl font-bold">Welcome, {guestUser.name}</h1>
        <p>{guestUser.email}</p>
      </div>

      <div className="flex flex-col items-center gap-4 justify-center">
        <h1 className="text-2xl font-bold">Welcome, Admin</h1>
        <p>{guestUser.name}</p>
        <img
          src={guestUser.image}
          alt="Guest Profile"
          width={100}
          height={100}
          className="rounded-full"
        />
        <p>{guestUser.email}</p>
        <SignOut />
      </div>
    </div>
  );
}
