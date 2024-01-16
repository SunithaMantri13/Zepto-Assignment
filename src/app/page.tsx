import ChipComponent from "@/components/Chip";
import ListItem from "@/components/Badge";
import Input from "@/components/Input";
import DropDownMenu from "@/components/DropDownMenu";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black space-y-16">
      <h1 className="font-bold text-6xl text-blue-400 mb-20">Pick Users</h1>
      <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Input />
      </div>
    </main>
  )
}
