import React, { memo, useCallback, useState, useRef } from 'react';


const DynamicScrollview = memo(({height, width, rows, getRowHeight, renderRow}) => {

    // Initial Setup
    const scrollPositionRef = useRef(0);

    const [spacers, setSpacers] = useState({ startHeight: 0, endPosition: 0, endHeight: 0 });

    // Calculate spacers and update state only if changed

    const recalculateSpacers = useCallback((scrollPosition) => {
        const { startHeight, endPosition, endHeight, position } = rows.reduce(({startHeight, endPosition, endHeight, position}, row) => ({
            startHeight: scrollPosition > position + getRowHeight(row) ? startHeight + getRowHeight(row) : startHeight,
            endPosition: scrollPosition + height < position && endPosition === 0 ? position : endPosition,
            endHeight: scrollPosition + height < position ? endHeight + getRowHeight(row) : endHeight,
            position: position + getRowHeight(row)
        }), {startHeight: 0,  endPosition: 0, endHeight: 0, position: 0});
        if(startHeight !== spacers.startHeight || endHeight !== spacers.endHeight) {
            setSpacers({ startHeight, endPosition: endHeight === 0 ? position : endPosition, endHeight });
        }
    }, [height, rows, getRowHeight, spacers]);

    const scrollPosition = scrollPositionRef.current;
    recalculateSpacers(scrollPosition);

    // Filter visible rows based on spacers

    const { visibleRows } = rows.reduce(({position, visibleRows}, row) => ({
        position: position + getRowHeight(row),
        visibleRows: position >= spacers.startHeight && position + getRowHeight(row) <= spacers.endPosition ? [...visibleRows, row] : visibleRows
    }), {position: 0, visibleRows: []});

    //Recalculate spacers on scroll and re-render on spacer change

    const onScroll = useCallback((e) => {
        const scrollPosition = scrollPositionRef.current = e.target.scrollTop;
        recalculateSpacers(scrollPosition);
    }, [recalculateSpacers]);

    // Render

    return <>
        <div>
            startSpacerHeight: {spacers.startHeight}
            <br/>
            visibleHeight: {visibleRows.reduce((total, row) => total + getRowHeight(row), 0)}
            <br/>
            endSpacerPosition: {spacers.endPosition}
            <br/>
            endSpacerHeight: {spacers.endHeight}
        </div>
        <div style={{ height, width, overflowY: 'scroll' }} onScroll={onScroll}>
            <div style={{height: spacers.startHeight}} />
            {
                visibleRows.map(row => renderRow(row))
            }
            <div style={{height: spacers.endHeight}} />
        </div>
    </>
});

export default DynamicScrollview;