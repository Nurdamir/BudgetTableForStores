import React, {Component} from 'react';
import BudgetTable from "./BudgetTable";

class Main extends Component {
    render() {
        return (
            <>
                <p className="fs-1 p-2">Расчет бюджета для магазинов!</p>
                <BudgetTable/>
            </>
        );
    }
}

export default Main;