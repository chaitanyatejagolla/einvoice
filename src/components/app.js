import React from 'react';
import Invoice from './invoice';

export default class App extends React.Component {
    render () {
        return (
            <div>
                <h1>Evaluation Exercise</h1>
                <Invoice />
            </div>
        );
    }
}