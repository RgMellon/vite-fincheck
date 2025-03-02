import { Spiner } from "./Spiner";

export function PageLoader() {
  return (
    <div className="w-full h-full fixed top-0 bg-gray-100 flex justify-center items-center">
      <Spiner />
    </div>
  );
}
