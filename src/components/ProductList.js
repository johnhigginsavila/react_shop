import { Component, PropTypes } from 'react'
import Dialog from 'react-bootstrap-dialog'
import { Link } from 'react-router'
import { ProductRow } from './ProductRow'
import { Cart } from './Cart'


export class ProductList extends Component {
    constructor (props){
        super(props)
        this.state = {
            shoppingList: []
        }
        this.resetShoppingList = this.resetShoppingList.bind(this)
        this.getState = this.getState.bind(this)
    }
    getState(){
        return {
            shoppingList: []
        }
    }
    resetShoppingList(){
        localStorage.removeItem('list');
        this.setState(this.getState())
        this.refs.confirmed.showAlert("Thank you for Buying!!!")
    }
     componentWillMount(){
         if(JSON.parse(localStorage.getItem('list'))){
            this.state.shoppingList = JSON.parse(localStorage.getItem('list'));
         }else{
             this.state.shoppingList = [];
         }
    }
    componentDidUpdate(){
        localStorage.setItem('list', JSON.stringify(this.state.shoppingList));
    }
    render(){
        const addToCart=(item) => {
            var newItem = {
                id:this.state.shoppingList.length + 1,
                productId:item.productId,
                productName:item.productName,
                category:item.category,
                photo:item.photo,
                price:item.price
            }
            this.setState({
                shoppingList:[
                    ...this.state.shoppingList,
                    newItem
                ]
            })
        }
        const removeFromCart = (id) => {
              this.setState({shoppingList: this.state.shoppingList.filter(function(product) { 
                return product.id !== id 
            })}) 
            //console.log(this.state.shoppingList)
        }
        const filterCategory = (data, filter) => {
            if(!filter){
                return data;
            }else{
                var newData = [];
                data.forEach((item, index, array) => {
                    if(item.category.toLowerCase() == filter){
                        newData.push(item);
                    }
                })
                return newData;
            }
            
        }
        return (
            <div className="container">
                <h1 className="jumbotron"><center>Products</center></h1>
                <aside className="col-md-4 col-md-push-8">
                    <Cart shoppingList={this.state.shoppingList} resetShoppingList={this.resetShoppingList} removeItem={removeFromCart} bonusLimit={this.props.bonusLimit} bonus={this.props.bonus}/>
                </aside>
                <main className="col-md-8 col-md-pull-4">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr className="danger">
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>
                                    <div className="dropdown">
                                            Product Category<span className="caret dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></span>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                            <li><Link to="/product-list/electronics">Electronics</Link></li>
                                            <li><Link to="/product-list/furniture">Furniture</Link></li>
                                            <li><Link to="/product-list">All</Link></li>
                                        </ul>
                                    </div>
                                </th>
                                <th>Price</th>
                                <th>View</th>
                                <th>Add To Cart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterCategory(this.props.list,this.props.filter).map((product, i) => <ProductRow key={i} {...product} addToCart={addToCart} />)
                            }
                        </tbody>
                    </table>
                </main>
                <Dialog ref='confirmed'/>
            </div>
        )
    }
}

ProductList.propTypes = {
    list:function(props){
        if(!Array.isArray(props.list)){
            return new Error(
                "ProductList.list should be an array"
            )
        }else if(!props.list.length){
            return new Error(
                "ProductList.list must have at least one record"
            )
        }else{
            return null
        }
    },
    bonus:PropTypes.bool.isRequired,
    bonusLimit:PropTypes.number,
    filter:PropTypes.string
}
