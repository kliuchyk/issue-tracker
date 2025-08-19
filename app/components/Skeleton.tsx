import ReactSkeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function Skeleton(props: React.ComponentProps<typeof ReactSkeleton>) {
  return <ReactSkeleton {...props} />;
}
