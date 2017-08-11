import React from 'react';

const DesignTile = (props) => {
    return (
        <div className="tile-block">
            <a href={props.url} target="_blank" className="tile">
                <div className="tile__img"
                    style={{backgroundImage: `url(${props.thumb})`}}>
                </div>
                <div className="tile__content">
                    <div className="tile__name">
                        {props.name}
                    </div>

                    <div className="tile__owner">
                        {props.owner.name}
                    </div>

                    <div className="tile__username">
                        {props.owner.username}
                    </div>

                    <ul className="tile__fields">
                        {props.fields.map((field, i) => {
                            return (
                                <li key={i}>
                                    {field}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </a>
        </div>
    )
}

export default DesignTile;