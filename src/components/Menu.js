import { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export class Menu extends Component {
    render(){
        return(
            <div className='nav navbar-inverse'>
                <div className='container'>
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                        <a className='navbar-brand' >REACT SHOP</a> 
                    </div>
                    <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                        <ul className='nav navbar-nav'>
                            <li><Link to="/" activeClassName="selected">Home</Link></li>
                            <li><Link to="/product-list" activeClassName="selected">Products</Link></li>
                            {(this.props.admin) ? <li><Link to="/admin" activeClassName="selected">Admin</Link></li>:null}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

Menu.propTypes = {
    admin:PropTypes.bool.isRequired
}