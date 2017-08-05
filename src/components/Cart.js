import { Component, PropTypes } from 'react'
import Dialog from 'react-bootstrap-dialog'
import TiShoppingCart from 'react-icons/lib/ti/shopping-cart'
import TiTimes from 'react-icons/lib/ti/times'
import FaEye from 'react-icons/lib/fa/eye'
import MdAttachMoney from 'react-icons/lib/md/attach-money'

import {CartDetails} from './CartDetails'
import {Buy} from './Buy'
import { Bonus } from './Bonus'

export class Cart extends Component {
    constructor(props){
        super(props)
        this.onBuy = this.onBuy.bind(this)
        this.state = {
            totalPrice:0,
            groupedItems:[]
        }
    }
    getInitialState(){
        this.state.groupedItems = this.populateProducts(this.processProducts(this.getUniqueProducts(this.props.shoppingList)),this.props.shoppingList);
    }
    componentWillMount(){
        this.state.groupedItems = this.populateProducts(this.processProducts(this.getUniqueProducts(this.props.shoppingList)),this.props.shoppingList);
    }
    componentDidUpdate(){
        this.state.groupedItems = this.populateProducts(this.processProducts(this.getUniqueProducts(this.props.shoppingList)),this.props.shoppingList);
    }
    getUniqueProducts(data){
        Array.prototype.contains = function(v){
            for(var i = 0; i< this.length; i++){
                if(this[i].productId === v.productId)return true;
            }
            return false;
        }
        Array.prototype.unique = function(){
            var arr = [];
            for(var i = 0; i < this.length; i++){
                if(!arr.contains(this[i])){
                    arr.push(this[i])
                }
            }
            return arr;
        }
        var uniqueData = data.unique();
        return uniqueData;
    }
    processProducts(data){
        var newData = [];
        data.forEach((item, index, array) => {
            var product = {
                id:[],
                productId:item.productId,
                productName:item.productName,
                category:item.category,
                unitPrice:item.price,
                photo:item.photo,
                quantity:0,
                totalPrice:0
            }
            newData.push(product);
        })
        return newData;
    }
    populateProducts(data,shoppingList){
        data.forEach((item, index, array) => {
            shoppingList.forEach((product, productIndex, productArray) => {
                if(item.productId == product.productId){
                    item.id.push(product.id);
                    item.quantity ++;
                    item.totalPrice += product.price;
                }
            })
        })
        return data;
    }
    confirmBuy(){
        this.state.groupedItems = [];
        this.props.resetShoppingList();
    }
    onBuy(){
        this.refs.buy.show({
            title:'Confirmation',
            body: <div>
                    <Buy groupedItems={this.state.groupedItems} totalPrice={this.totalPrice(this.props.shoppingList)} bonusLimit={this.props.bonusLimit} bonus={this.props.bonus}/>
                    
                </div>,
            actions:[
                Dialog.CancelAction(),
                Dialog.DefaultAction(
                    'Confirm',
                    () => {
                        this.confirmBuy()
                        
                    },
                    'btn-info glyphicon-plus'
                )
            ],
            bsSize:'medium'
        })
    }
    totalPrice(list){
        var price = 0;
        list.forEach((item, index, array) => {
            price += item.price;
        });
        return price;
    }
    render(){
        const removeItem = (product) => {
            this.props.removeItem(product)
        }
        this.state.groupedItems = this.populateProducts(this.processProducts(this.getUniqueProducts(this.props.shoppingList)),this.props.shoppingList);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title"><span><TiShoppingCart /></span> Cart</h3>
                </div>
                <div className="panel-body">
                    <div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Qty</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>View</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.groupedItems.map((product, i) => 
                                    <CartDetails key={i} {...product} removeItem={removeItem} />
                                )}
                            </tbody>
                        </table>
                        {(this.props.bonus)?<Bonus bonusLimit={this.props.bonusLimit} bonus={this.props.bonus} groupedItems={this.state.groupedItems}/>:null}
                    </div>
                </div>
                <div className="panel-footer">
                    <div className='col-md-7'>Total: $ {this.totalPrice(this.props.shoppingList)}.00 </div>
                    <div>{
                            (this.props.shoppingList.length == 0) ? <button className="btn btn-success btn-block btn-sm disabled" ><MdAttachMoney /> Buy</button>:
                            <button className="btn btn-success btn-block btn-sm" onClick={this.onBuy}><MdAttachMoney /> Buy</button>        
                        }
                    </div>
                    <Dialog ref='buy'/>
                </div>
            </div>
        )
    }
}

Cart.propTypes = {
    shoppingList:PropTypes.array.isRequired,
    resetShoppingList:PropTypes.func.isRequired,
    removeItem:PropTypes.func.isRequired,
    bonus:PropTypes.bool.isRequired,
    bonusLimit:PropTypes.number
}
