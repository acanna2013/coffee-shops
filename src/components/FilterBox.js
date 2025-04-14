import React, {useState} from 'react';
import './FilterBox.css';
function FilterBox({ onFilterChange }) {
    const [radius, setRadius] = useState(10);

    const handleSliderChange = (e) => {
        const value = e.target.value;
        setRadius(value);
        onFilterChange('radius', value)
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        onFilterChange(name, checked);
    };

    return (
        <div className="filter-sidebar">
            <h3>Filters</h3>

            <label>
                Radius (in miles): <span>{radius}</span>
                <div></div>
                <input type="range" name="radius" list="tickmarks" min="1" max="10" value={radius} onChange={handleSliderChange}/>
            </label>

            <datalist id="tickmarks">
                <option value="0" label="0"></option>
                <option value="5" label="5"></option>
                <option value="10" label="10"></option>
            </datalist>
        </div>
    );
}

export default FilterBox;
