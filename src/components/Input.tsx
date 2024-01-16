"use client";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import Badge from "./Badge";
import DropDownMenu from "./DropDownMenu";
import { faker } from "@faker-js/faker";

interface Item {
  label: string;
  image: string;
  value: string;
}

export interface ListItem {
  label: string;
  value: string;
  image: string;
}

const Input: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [allItems, setAllItems] = useState<ListItem[]>([
    {
      label: "Marina Augustine",
      value: "marina@example.com",
      image: faker.image.avatar(),
    },
    {
      label: "Nick Giannopoulos",
      value: "nick@example.com",
      image: faker.image.avatar(),
    },
    {
      label: "Gavruv Sen",
      value: "savruv@example.com",
      image: faker.image.avatar(),
    },
    {
      label: "Hemosho Hidaka",
      value: "hemosho@example.com",
      image: faker.image.avatar(),
    },
    {
      label: "Priyanka Prathap",
      value: "priyanka@example.com",
      image: faker.image.avatar(),
    },
    {
      label: "Kamesopa Dichik",
      value: "kamesopa@example.com",
      image: faker.image.avatar(),
    },
    {
      label: "Arupva Hameka",
      value: "arupva@example.com",
      image: faker.image.avatar(),
    },
    {
      label: faker.person.firstName(),
      value: faker.internet.email(),
      image: faker.image.avatar(),
    },
    {
      label: faker.internet.userName(),
      value: faker.internet.email(),
      image: faker.image.avatar(),
    },
    {
      label: faker.internet.userName(),
      value: faker.internet.email(),
      image: faker.image.avatar(),
    },
    {
      label: faker.internet.userName(),
      value: faker.internet.email(),
      image: faker.image.avatar(),
    },
    {
      label: "Sim sammug",
      value: "sim@example.com",
      image: faker.image.avatar(),
    },
  ]);
  const [dropdownItems, setDropdownItems] = useState<ListItem[]>(allItems);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleArrowKey = (direction: "up" | "down"): void => {
    const maxIndex = dropdownItems.length - 1;
    let newIndex: number;

    if (hoveredIndex === null) {
      newIndex = direction === "down" ? 0 : maxIndex;
    } else {
      newIndex =
        direction === "down"
          ? Math.min(maxIndex, hoveredIndex + 1)
          : Math.max(0, hoveredIndex - 1);
    }

    setHoveredIndex(newIndex);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    // Filter unselected dropdown items based on input value
    const filteredItems = allItems.filter(
      (item) =>
        !selectedItems.some(
          (selectedItem) => selectedItem.label === item.label
        ) &&
        (item.label.toLowerCase().includes(value.toLowerCase()) ||
          item.value.toLowerCase().includes(value.toLowerCase()))
    );

    setDropdownItems(filteredItems);
  };

  const handleItemClick = (item: ListItem): void => {
    setDropdownItems((prevItems) =>
      prevItems.filter((dropdownItem) => dropdownItem.label !== item.label)
    );

    setSelectedItems([
      ...selectedItems,
      { label: item.label, image: item.image, value: item.value },
    ]);
    setInputValue("");
    

    if (selectedItems.length === 0) {
      setHighlightedIndex(null);
    }
  };

  const handleRemoveItem = (index: number): void => {
    const removedItem = selectedItems[index];

    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);

    if (removedItem) {
      setDropdownItems((prevItems) => [
        ...prevItems,
        {
          label: removedItem?.label,
          value: removedItem?.value,
          image: removedItem?.image,
        },
      ]);
    }
  };

  const handleDropdownItemClick = (item: ListItem): void => {
    handleItemClick(item);
  };

  const handleEnterKey = (): void => {
    if (dropdownItems.length > 0) {
      handleItemClick(dropdownItems[hoveredIndex !== null ? hoveredIndex : 0]);
    }
  };

  const handleBackspace = (): void => {
    // If the input is empty and there are selected items, highlight and remove the last item
    if (inputValue === "" && selectedItems.length > 0) {
      const lastIndex = selectedItems.length - 1;
      setHighlightedIndex(lastIndex);
    }
    if (
      inputValue === "" &&
      selectedItems.length > 0 &&
      highlightedIndex !== null
    ) {
      handleRemoveItem(highlightedIndex!);
    }

    if (selectedItems.length === 0) {
      setHighlightedIndex(null);
    }
  };

  return (
    <div className="relative flex flex-row w-screen border-b-4 border-blue-400 pb-5">
      {selectedItems.length > 0 && (
        <div className="flex flex-row">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {selectedItems.map((item, index) => (
              <Badge
                key={index}
                title={item.label}
                image={item.image}
                highlight={index === highlightedIndex}
                onRemove={() => handleRemoveItem(index)}
              />
            ))}
            <div className="self-center">
              <input
                type="text"
                id="new-user"
                value={inputValue}
                onChange={handleInputChange}
                className="text-xl text-center focus:outline-none self-center"
                placeholder="Add new user"
                onFocus={() => setIsDropdownOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEnterKey();
                  } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    e.preventDefault();
                    handleArrowKey(e.key === "ArrowDown" ? "down" : "up");
                  } else if (e.key === "Backspace") {
                    handleBackspace();
                  }
                }}
              />
              {isDropdownOpen && dropdownItems.length > 0 && (
                <DropDownMenu
                  items={dropdownItems}
                  onItemClick={handleDropdownItemClick}
                  onHover={(index) => setHoveredIndex(index)}
                  hoveredIndex={hoveredIndex}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {selectedItems.length === 0 && (
        <div>
          <input
            type="text"
            id="new-user"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEnterKey();
              } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
                handleArrowKey(e.key === "ArrowDown" ? "down" : "up");
              } else if (e.key === "Backspace") {
                handleBackspace();
              }
            }}
            className="text-xl text-center focus:outline-none self-center"
            placeholder="Add new user"
            onFocus={() => setIsDropdownOpen(true)}
          />
          {isDropdownOpen && dropdownItems.length > 0 && (
            <DropDownMenu
              items={dropdownItems}
              onItemClick={handleDropdownItemClick}
              onHover={(index) => setHoveredIndex(index)}
              hoveredIndex={hoveredIndex}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
