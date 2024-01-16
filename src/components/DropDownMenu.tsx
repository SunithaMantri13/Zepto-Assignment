import { ListItem } from "./Input";

interface DropDownMenuProps {
  items: ListItem[];
  onItemClick: (item: ListItem) => void;
  onHover: (index: number | null) => void; // Add onHover prop
  hoveredIndex: number | null; // Add hoveredIndex prop
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  items,
  onItemClick,
  onHover,
  hoveredIndex,
}) => {
  return (
    <div className="z-10 absolute top-full bg-white border border-gray-300 rounded-md shadow-lg p-2 mt-2 overflow-y-auto max-h-[224px]">
      <ul className="w-[28rem] overflow-x-hidden">
        {items.map((item, index) => (
          <li
            key={index}
            className={`hover:bg-slate-100 ${
              index === hoveredIndex ? "bg-slate-100" : ""
            }`}
            role="button"
            onMouseEnter={() => onHover(index)}
            onClick={() => onItemClick(item)}
          >
            <article className="flex items-center space-x-6 p-2 w-full">
              <img
                src={item.image}
                alt=""
                width="40"
                height="40"
                className="flex-none rounded-full bg-slate-100"
              />
              <h2 className="font-semibold text-md text-slate-900 truncate pr-40">
                {item.label}
              </h2>
              <div className="flex-none w-full font-normal">{item.value}</div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownMenu;
