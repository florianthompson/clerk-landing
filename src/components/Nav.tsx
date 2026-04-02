import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-center py-5 px-10">
      <Link href="/" className="nav-brand">
        Clerk
      </Link>
    </nav>
  );
}
