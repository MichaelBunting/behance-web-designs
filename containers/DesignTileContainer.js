import React from 'react';

import Api from '../api/Api';
import DesignTile from '../components/DesignTile';

class DesignTileContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            tiles: []
        }
    }

    componentDidMount() {
        Api.getProjectsDefault()
            .then((data) => {
                this.setState({
                    tiles: data
                });
            });
    }

    render() {
        return (
            <div className="tile-container">
                {this.state.tiles.map((project, i) => {
                    return (
                        <DesignTile key={i}
                            {... project} />
                    )
                })}
            </div>
        )
    }
}

export default DesignTileContainer;