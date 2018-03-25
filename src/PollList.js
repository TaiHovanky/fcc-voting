import React from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import axios from 'axios';

class PollList extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {
            polls: []
        }
    }

    componentDidMount () {
        console.log('componentdidmount');
        axios.get('/polls/allpolls').then(response => {
            console.log('response', response.data);
            this.setState({
                polls: response.data
            });
        });
    }

    render () {
        return (
            <List>
                {this.state.polls.map(poll => {
                    return <ListItem primaryText={poll.question} />
                })}
            </List>
        );
    }
}

export default PollList;