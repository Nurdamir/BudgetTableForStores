import React, {useState, useEffect} from 'react';
import './BudgetTable.css';

const BudgetTable = () => {
    const [storeBudgets, setStoreBudgets] = useState<string[][]>(
        () => {
            const storedData = localStorage.getItem('storeBudgets');
            if (storedData) {
                return JSON.parse(storedData);
            } else {
                return Array.from({length: 12}, () => Array.from({length: 12}, () => ''));
            }
        }
    );

    useEffect(() => {
        localStorage.setItem('storeBudgets', JSON.stringify(storeBudgets));
    }, [storeBudgets]);

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

    const handleClearData = () => {
        setStoreBudgets(Array.from({length: 12}, () => Array.from({length: 12}, () => '')));
        localStorage.removeItem('storeBudgets');
    };

    return (
        <>
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
                                className="p-2"

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
            <div className="d-flex justify-content-center">
                <button className="p-3 btn btn-warning fs-4" onClick={handleClearData}>Очистить данные</button>
            </div>

        </>
    );
};

export default BudgetTable;
