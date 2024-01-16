import Image from "next/image";
import { RxCross1 } from "react-icons/rx";

interface ChipData {
  title: string;
  image: string;
  onRemove: () => void;
  highlight: boolean;
}

const Chip: React.FC<ChipData> = ({ title, image, onRemove, highlight }) => {
  const chipStyles = `flex items-center space-x-3 p-2 bg-gray-300 rounded-full w-auto h-12 ${
    highlight ? "border-2 border-blue-500" : ""
  }`;

  return (
    <div className={chipStyles}>
      <Image
        src={image}
        alt=""
        width="40"
        height="40"
        className="flex-none rounded-full bg-slate-100"
      />
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-xl text-slate-900 truncate pr-10">
          {title}
        </h2>
      </div>
      <RxCross1
        role="button"
        className="bg-none hover:bg-[#3e3c3c] hover:text-white hover:rounded-sm z-10"
        onClick={onRemove}
      />
    </div>
  );
};

export default Chip;
