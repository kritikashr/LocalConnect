import Link from "next/link";

export default function Navbar() {

  return (
    <div className="flex justify-between items-center w-full p-4 bg-gray-100 sticky top-0">
      <div>Logo</div>
      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        <Link href="/complaint">Complaint</Link>
        <Link href="/news">News</Link>

        {/* {session?.user?.role?.toLowerCase() === "admin" && (
          <Link href="/admin">Admin</Link>
        )}

        {session ? (
          <>
            <button onClick={() => signOut()}>Logout</button>
          </>
        ) : (
          <button onClick={() => signIn()}>Login</button>
        )} */}
      </div>
    </div>
  );
}
