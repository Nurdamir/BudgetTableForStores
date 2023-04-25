import React, {Component} from 'react';
import BudgetTable from "./BudgetTable";

class Main extends Component {
    render() {
        return (
            <>
                <span className="fs-1 p-3 bg-warning rounded-2">Расчет бюджета для магазинов!</span>
                <BudgetTable/>
            </>
        );
    }
}

export default Main;