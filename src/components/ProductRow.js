import { Component, PropTypes } from 'react'
import Dialog from 'react-bootstrap-dialog'
import CartArrowDown from 'react-icons/lib/fa/cart-arrow-down'
import CartPlus from 'react-icons/lib/fa/cart-plus'
import FaEye from 'react-icons/lib/fa/eye'

export class ProductRow extends Component {
    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
    }
    onClick(){
        this.refs.dialog.show({
            title:this.props.productName,
            body:<div>
                    <div>
                        <div className='col-lg-6'><img height="200" width="200" src={this.props.photo} alt={this.props.productName}/></div>
                        <div className='col-lg-6'>
                            <ul>
                                <li>Price: ${this.props.price}.00</li>
                            </ul>
                        </div>
                    </div>                    
                </div>,
            actions:[
                Dialog.CancelAction(),
                Dialog.DefaultAction(
                    
                    ' Add To Cart',
                    () => {
                        this.props.addToCart(this.props)
                    },
                    'btn-success glyphicon-plus'
                )
            ],
            bsSize:'medium'
        })
    }
    render(){
        const add = () => {
            this.props.addToCart(this.props);
        }
        return (
            <tr>
                <td>{this.props.productId}</td>
                <td>{this.props.productName}</td>
                <td>{this.props.category}</td>
                <td>$ {this.props.price}.00</td>
                <td><button className="btn btn-warning btn-sm" onClick={this.onClick}><FaEye  /></button></td>
                <td>
                    <div><button className="btn btn-success btn-sm" onClick={add}><span><CartPlus/></span></button></div>
                </td>
                <Dialog key={this.props.productId} ref='dialog'/>
            </tr>
        )
    }
}

ProductRow.propTypes = {
    productId:PropTypes.number,
    productName:PropTypes.string,
    category:PropTypes.string,
    price:PropTypes.number
}