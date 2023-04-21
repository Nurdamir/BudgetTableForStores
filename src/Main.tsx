import React from 'react';
import BudgetTable from "./BudgetTable";

const Main = () => {
    return (
        <>
            <p className="fs-1 p-2">Расчет бюджета для магазинов!</p>
            <BudgetTable/>
        </>
    );
};

export default Main;