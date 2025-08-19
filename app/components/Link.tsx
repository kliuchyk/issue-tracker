import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  children: React.ReactNode;
  href: string;
}

export function Link({ children, href }: Props) {
  return (
    <RadixLink asChild>
      <NextLink href={href}>{children}</NextLink>
    </RadixLink>
  );
}
