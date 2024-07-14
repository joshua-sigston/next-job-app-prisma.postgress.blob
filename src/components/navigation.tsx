import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";

export default function Navigation() {
  return (
    <header className="p-5">
      <nav className="flex justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Image src={logo} height={40} width={40} alt="logo" />
          <span>Link Jobs</span>
        </Link>
        <Button asChild>
          <Link href="/jobs/create">Post A Job</Link>
        </Button>
      </nav>
    </header>
  );
}
