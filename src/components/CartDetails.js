import { Component, PropTypes } from 'react'
import Dialog from 'react-bootstrap-dialog'
import TiShoppingCart from 'react-icons/lib/ti/shopping-cart'
import TiTimes from 'react-icons/lib/ti/times'
import FaEye from 'react-icons/lib/fa/eye'
import MdAttachMoney from 'react-icons/lib/md/attach-money'

export class CartDetails extends Component {
    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
    }
    removeFromCart(item){
        this.props.removeItem(item);
    }    
    onClick(){
        this.refs.dialog.show({
            title:this.props.productName,
            body:<div>
                    <div>
                        <div className='col-lg-6'><img  height="200" width="200" src={this.props.photo} alt={this.props.productName}/></div>
                        <div className='col-lg-6'>
                            <ul>
                                <li>Price: ${this.props.unitPrice}.00</li>
                            </ul>
                        </div>
                    </div>                    
                </div>,
            actions:[
                Dialog.CancelAction(),
                Dialog.DefaultAction(
                    ' Remove',
                    () => {
                        this.removeFromCart(this.props.id[0])
                    },
                    'btn-danger glyphicon-minus'
                )
            ],
            bsSize:'medium'
        })
    }
    render(){
        const removeItem = () =>{
            this.removeFromCart(this.props.id[0]);
        }
        const productDetails = () => {
            this.viewProductDetails();
        }
        return (
            <tr >
                <td>{this.props.quantity}</td>
                <td className="col-sm-6">{this.props.productName}</td>
                <td className="col-sm-3">${this.props.unitPrice}</td>
                <td><button className="btn btn-warning btn-sm" onClick={this.onClick}><FaEye /></button></td>
                <td className="col-sm-3"><button className="btn btn-danger btn-sm" onClick={removeItem} ><TiTimes /></button></td>
                <Dialog key={this.props.productId} ref='dialog'/>
            </tr>
        )
    }
}

CartDetails.propTypes = {
    quantity:PropTypes.number,
    productName: PropTypes.string,
    unitPrice: PropTypes.number,
    productId: PropTypes.number,
    id:PropTypes.array
}