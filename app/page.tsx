import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>Hello World!</div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}
