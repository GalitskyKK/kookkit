"use client";

import { cn } from "@/shared/lib/utils";
import React, { useEffect, useState } from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signIn } from "next-auth/react";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal";

interface Props {
  hasSearch?: boolean;
  // hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  // hasCart = true,
  className,
}) => {
  const [openAuth, setOpenAuth] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Order payed successfully";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Email confirm successfully";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, [searchParams]);

  return (
    <header className={cn("border-b", className)}>
      <div>
        <Container className="flex items-center justify-center md:justify-between py-8">
          {/* {Left side} */}
          <Link href="/">
            <div className="flex items-center gap-4">
              <Image src="/LogoNMKK.png" alt="Logo" width={90} height={45} />
              <div>
                <h1 className="text-2xl uppercase font-black">KookKit</h1>
                <p className="text-sm text-gray-400 leading-3">mmm Tasty af</p>
              </div>
            </div>
          </Link>
          {hasSearch && (
            <div className="mx-10 w-96 hidden md:block">
              <SearchInput />
            </div>
          )}
          {/* {Right side} */}
            {hasSearch && (
              <div className="flex items-center gap-3">
                <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
                <ProfileButton onClickSignIn={() => setOpenAuth(true)} className="ml-5 md:ml-0"/>
                {/* {hasCart && <CartButton />} */}
              </div>
            )}
        </Container>
      </div>
    </header>
  );
};
