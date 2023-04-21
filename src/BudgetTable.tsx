import React, {useState} from 'react';
import './BudgetTable.css';

const BudgetTable = () => {
    const [storeBudgets, setStoreBudgets] = useState<string[][]>(
        Array.from({length: 12}, () => Array.from({length: 12}, () => ''))
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

    const grandTotal = storeBudgets
        .flatMap((store) => store)
        .filter((budget) => budget !== '')
        .reduce((acc, curr) => acc + parseFloat(curr), 0);

    return (
        <table>
            <thead>
            <tr>
                <th>All Stores</th>
                <th className="fw-bolder">January</th>
                <th className="fw-bolder">February</th>
                <th className="fw-bolder">March</th>
                <th className="fw-bolder">April</th>
                <th className="fw-bolder">May</th>
                <th className="fw-bolder">June</th>
                <th className="fw-bolder">July</th>
                <th className="fw-bolder">August</th>
                <th className="fw-bolder">September</th>
                <th className="fw-bolder">October</th>
                <th className="fw-bolder">November</th>
                <th className="fw-bolder">December</th>
                <th className="fw-bolder fs-2">Total</th>
            </tr>
            </thead>
            <tbody>
            {storeBudgets.map((store, storeIndex) => (
                <tr key={storeIndex}>
                    <td width={"130px"} className="fw-bolder">Store {storeIndex + 1}</td>
                    {store.map((budget, monthIndex) => (
                        <td className="fw-bolder fs-2" key={monthIndex}>
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
                    <td className="fw-bolder fs-2">{storeTotal(storeIndex)}</td>
                </tr>
            ))}
            <tr>
                <td className="fw-bolder fs-3">Total</td>
                {Array.from({length: 12}, (_, monthIndex) => (
                    <td className="fw-bolder fs-2" key={monthIndex}>{monthTotal(monthIndex)}</td>
                ))}
                <td className="fw-bold fs-1">{grandTotal}</td>
            </tr>
            </tbody>
        </table>
    );
};

export default BudgetTable;
