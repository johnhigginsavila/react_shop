import { Component } from 'react'

export class Invalid404 extends Component {
    render(){
        return (
            <div className="container">
                <h1 className="jumbotron">
                ERROR 404
                </h1>
                <div className="container">
                    <h3>
                        Invalid UrlRequest
                    </h3>
                </div>
            </div>
        )
    }
}