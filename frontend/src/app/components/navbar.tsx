import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-center space-x-6">
        <Link
          href="/"
          className="text-white text-lg hover:text-blue-400 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-white text-lg hover:text-blue-400 transition-colors"
        >
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
