import { Component, PropTypes } from 'react'
import { Bonus } from './Bonus'

export class Buy extends Component {
    render(){
        return (
            <div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Qty</th>
                                <th>Product Name </th>
                                <th>Unit Price </th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.groupedItems.map((product, i) => 
                                <BuyDetails key={i} {...product}/>
                            )}
                        </tbody>
                    </table>
                    {(this.props.bonus)?<Bonus bonus={this.props.bonus} bonusLimit={this.props.bonusLimit} groupedItems={this.props.groupedItems}/>:null}
                    <div>Total: $ {this.props.totalPrice}.00</div>
                </div>                    
            </div>
        )
    }
}

export class BuyDetails extends Component {
    render(){
        return (
            <tr>
                <td>{this.props.quantity}</td>
                <td>{this.props.productName}</td>
                <td>${this.props.unitPrice}.00</td>
                <td>${this.props.quantity * this.props.unitPrice}.00</td>
            </tr>
        )
    }
}


Buy.propTypes = {
    groupedItems:PropTypes.array.isRequired,
    totalPrice:PropTypes.number.isRequired,
    bonus:PropTypes.bool.isRequired,
    bonusLimit:PropTypes.number,
}