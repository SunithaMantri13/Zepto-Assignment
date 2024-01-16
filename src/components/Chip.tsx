"use client"
import React, { useState } from 'react';

interface ChipData {
    label: string;
    value: string;
}

const ChipComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [chips, setChips] = useState<ChipData[]>([]);
    const [items, setItems] = useState<ChipData[]>([
        { label: 'Marina Augustine', value: 'marina@example.com' },
        { label: 'Nick Giannopoulos', value: 'nick@example.com' },
        // ... other items
    ]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLastChipHighlighted, setIsLastChipHighlighted] = useState(false);

    // ... component logic (same as previous response)
    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
        setItems(
            items.filter((item) => item.label.toLowerCase().startsWith(event.target.value.toLowerCase()))
        );
    };

    const handleItemClick = (item: ChipData) => {
        setChips([...chips, item]);
        setItems(items.filter((i) => i !== item));
        setInputValue('');
    };

    const handleChipDelete = (value: string) => {
        setChips(chips.filter((chip) => chip.value !== value));
        setItems([...items, { label: value, value }]);
    };

    return (
        <div className="chip-container">
            {/* Input field and dropdown list */}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && (
                <ul className="dropdown-list">
                    {items.map((item) => (
                        <li key={item.value} onClick={() => handleItemClick(item)}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}

            {/* Chip list */}
            <ul className="chip-list">
                {chips.map((chip, index) => (
                    <li
                        key={chip.value}
                        className={`chip ${isLastChipHighlighted && index === chips.length - 1 ? 'highlighted' : ''}`}
                    >
                        {chip.label}
                        <button onClick={() => handleChipDelete(chip.value)}>x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChipComponent;
