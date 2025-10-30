import { Spinner } from "@/components/ui/spinner";

function Loading() {
  return (
    <div className="w-full  flex items-center justify-center gap-6 py-10">
      {/* <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" /> */}
      <Spinner className="size-8 text-gray-500" />
    </div>
  );
}

export default Loading;
