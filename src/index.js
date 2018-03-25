import React from 'react';
import ReactDOM from 'react-dom';
import PollList from './PollList';

class App extends React.Component {
    render(){
        return(
            <div>
                <h1>Howdy from React!</h1>
                <PollList />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));