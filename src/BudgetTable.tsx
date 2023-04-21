import React, { useState } from 'react';

const BudgetTable = () => {
    const [storeBudgets, setStoreBudgets] = useState<string[][]>(
        Array.from({ length: 12 }, () => Array.from({ length: 12 }, () => ''))
    );

    const handleStoreBudgetChange = (
        storeIndex: number,
        monthIndex: number,
        value: string
    ) => {
        const newStoreBudgets = [...storeBudgets];
        newStoreBudgets[storeIndex][monthIndex] = value;
        setStoreBudgets(newStoreBudgets);
    };

    const storeTotal = (storeIndex: number) =>
        storeBudgets[storeIndex]
            .filter((budget) => budget !== '')
            .reduce((acc, curr) => acc + parseFloat(curr), 0);

    const monthTotal = (monthIndex: number) =>
        storeBudgets
            .map((store) => store[monthIndex])
            .filter((budget) => budget !== '')
            .reduce((acc, curr) => acc + parseFloat(curr), 0);

    return (
        <table>
            <thead>
            <tr>
                <th>Store</th>
                {Array.from({ length: 12 }, (_, index) => (
                    <th key={index}>Month {index + 1}</th>
                ))}
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            {storeBudgets.map((store, storeIndex) => (
                <tr key={storeIndex}>
                    <td>Store {storeIndex + 1}</td>
                    {store.map((budget, monthIndex) => (
                        <td key={monthIndex}>
                            <input
                                type="number"
                                value={budget}
                                onChange={(event) =>
                                    handleStoreBudgetChange(
                                        storeIndex,
                                        monthIndex,
                                        event.target.value
                                    )
                                }
                                min="0"
                            />
                        </td>
                    ))}
                    <td>{storeTotal(storeIndex)}</td>
                </tr>
            ))}
            <tr>
                <td>Total</td>
                {Array.from({ length: 12 }, (_, monthIndex) => (
                    <td key={monthIndex}>{monthTotal(monthIndex)}</td>
                ))}
            </tr>
            </tbody>
        </table>
    );
};

export default BudgetTable;
