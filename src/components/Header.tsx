import JobSmith from "../assets/JobSmith.svg"
export function Header() {
  return (
    <header className="bg-white h-14 items-center flex p-5 w-full shadow-md">
        <div className="relative h-7 w-7 flex flex-row items-center gap-4">
          <div className="absolute h-full w-full rounded-full border-2 border-[#CCA349]"></div>
          <img src={JobSmith} className="object-cover h-full w-full rounded-full" />
          <h1 className="text-base font-bold">JobSmith</h1>
        </div>
    </header>
  )
}