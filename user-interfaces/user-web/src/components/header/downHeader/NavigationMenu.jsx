import React from "react";

export default class NavigationMenu extends React.Component {
    render() {
        return (
            <ul className="naviagtion__menu">
                <li className="home__selected">Home</li>
                <li>Switch</li>
                <li>GameCube</li>
                <li>MS-DOS</li>
                <li>Specials</li>
            </ul>
        )
    }
}