import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  children: React.ReactNode;
  href: string;
}

export function Link({ children, href }: Props) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
}
