import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  onClickSignIn,
  className,
}) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          className="flex items-center gap-1"
          variant="outline">
          <User size={16} />
          Sign in
        </Button>
      ) : (
        <Link href="/profile" className="flex items-center gap-2">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            {session.user.name}
          </Button>
        </Link>
      )}
    </div>
  );
};
