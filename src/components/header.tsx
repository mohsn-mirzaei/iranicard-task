import { cn } from "@/lib/utils";
import Link from "next/link";
import { MegaMenu } from "./mega-manu";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "خانه", href: "/" },
  { label: "ولت‌ها", href: "/wallets" },
  { label: "اضافه کردن ولت", href: "/add-wallet" },
  { label: "ورود", href: "/login" },
];

const linkStyle = {
  default: "px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100",
};

export default function Header() {
  return (
    <header className="shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="relative">
          {/* Hamburger menu checkbox (hidden) */}
          <input type="checkbox" id="hamburger" className="hidden peer" />

          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6 justify-between w-full md:w-fit">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold">
                  لوگو
                </Link>
              </div>

              {/* Hamburger icon */}
              <label htmlFor="hamburger">
                <Menu size={24} className="md:hidden cursor-pointer" />
              </label>

              {/* Desktop navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {navLinks.map(({ href, label }) => {
                  if (href === "/wallets") {
                    return (
                      <div key={label} className="relative group">
                        <span className={cn(linkStyle.default)}>ولت ها</span>
                        <MegaMenu />
                      </div>
                    );
                  }

                  if (href !== "/login")
                    return (
                      <Link
                        key={label}
                        href={href}
                        className={cn(linkStyle.default)}
                      >
                        {label}
                      </Link>
                    );
                })}
              </div>
            </div>
            <Link href="/login">
              <Button
                className="hidden md:block rounded-full"
                variant={"outline"}
              >
                ورود
              </Button>
            </Link>
          </div>

          {/* Mobile navigation - shown when hamburger is checked */}
          <div className="md:hidden bg-background absolute top-16 left-0 right-0 shadow-md max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-56 z-10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn("block", linkStyle.default)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
