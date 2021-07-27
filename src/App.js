import "./App.css";
import DynamicScrollview from "./DynamicScrollview";
import React, { useState } from "react";

const rows = new Array(1000).fill(0).map((item, i) => ({
  id: i + 1,
  text: `Row Number ${i + 1}`,
  backgroundColor: i % 2 === 0 ? "black" : "white",
  color: i % 2 === 1 ? "black" : "white",
  height: i % 3 === 0 ? 100 : 50,
}));

const renderRow = ({ id, text, backgroundColor, color, height }) => (
  <div style={{ height, backgroundColor, color, display: 'flex', alignItems: 'center' }} key={id}>
    {text}
  </div>
);

const getRowHeight = ({ height }) => height;

const useCheckState = (initial) => {
    const [checked, setValue] = useState(initial);
    return {
        type: 'checkbox',
        checked,
        onChange: (e) => setValue(e.target.checked)
    };
};

function App() {

    const multiple4filter = useCheckState(true);
    const multiple5filter = useCheckState(true);

    const filteredRows = rows.filter(({id}) => multiple4filter.checked || id % 4 !== 0)
                            .filter(({id}) => multiple5filter.checked || id % 5 !== 0);

    return (
        <div className="App">
        <header className="App-header">
            <DynamicScrollview
            height={500}
            width={500}
            rows={filteredRows}
            getRowHeight={getRowHeight}
            renderRow={renderRow}
            />
            <p>Filters:</p>
            <label>Multiples of 4<input {...multiple4filter} /></label>
            <label>Multiples of 5<input {...multiple5filter} /></label>
        </header>
        </div>
  );
}

export default App;
