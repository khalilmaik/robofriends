import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searfield: ''
        }
        console.log('constructor')
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users}))
        console.log('componentDidMount')
    }

    onSearchChange = (event) => {
        this.setState({searfield: event.target.value})
    }
    
    render() {
        const { robots , searfield } = this.state;
        const filtredRobotos = robots.filter(robot =>
            robot.name.toLocaleLowerCase().includes(searfield.toLocaleLowerCase())
        )
        console.log('render');
        return !robots.length ? <h1>LOADING</h1> : (
            <div className="tc">
                <h1 className="f1">ROBOFRIENDS</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList arr = {filtredRobotos} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
        }
    }

export default App;