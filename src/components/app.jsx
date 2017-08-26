import React from 'react';
import Invoice from './invoice.jsx';

class App extends React.Component {
    render () {
        var style = {
            padding: "20px"
        };

        return (
            <div className="container" style={style}>
                <h1>Evaluation Exercise</h1>
                <Invoice />
            </div>
        );
    }
}

export default App;
