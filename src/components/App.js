import { Component } from 'react'
import { ProductList } from './ProductList'
import { Menu } from './Menu'
import { Home } from './Home'
import { Admin } from './Admin'
import { Link } from 'react-router'

export class App extends Component {
    constructor (props){
        super(props)
        this.toggleAdmin = this.toggleAdmin.bind(this)
        this.setBonus = this.setBonus.bind(this)
        this.setBonusLimit = this.setBonusLimit.bind(this)
        this.setDiscount = this.setDiscount.bind(this)
        this.state = {
            list: [],
            admin:false,
            bonus:true,
            bonusLimit:0,
            discount:0
        }
    }
    componentWillMount(){
        this.state.list = require('../data/product.json');
    }
    updateCart = (data) => {
        console.log(data);
    }
    activateDiscount(data, discount){
        var newData = [];
        data.forEach((item, index, array) => {
            var newItem = {
                productId:item.productId + 1,
                productName:item.productName,
                category:item.category,
                price:item.price - (item.price * discount),
                photo:item.photo
            }
            newData.push(newItem);
        })
        return newData;
    }
    toggleAdmin(){
        if(this.state.admin){
            this.setState({
                admin:false
            });
        }else{
            this.setState({
                admin:true
            });
        }
    }
    setBonus(e){
        this.setState({
            bonus:e
        })
    }
    setBonusLimit(value){
        this.setState({
            bonusLimit:value
        })
    }
    setDiscount(value){
        this.setState({
            discount:value
        })
    }
    render(){
        return (
            <div>
                <Menu admin={this.state.admin}/>
                <div className="container">
                    <div className="checkbox ">
                        <label><input  type="checkbox" onChange={this.toggleAdmin} checked={this.state.admin} />Toggle Administrator</label>
                    </div>
                </div>
                {
                    (this.props.location.pathname ==="/") ?
                    <Home />:
                    (this.props.location.pathname === "/admin" && this.state.admin) ?
                    <Admin discount={this.state.discount} bonus={this.state.bonus} bonusLimit={this.state.bonusLimit} setDiscount={this.setDiscount} setBonus={this.setBonus} setBonusLimit={this.setBonusLimit}/>:
                    <ProductList list={this.activateDiscount(this.state.list,this.state.discount)} filter={this.props.params.filter} bonusLimit={this.state.bonusLimit} bonus={this.state.bonus}/>
                    
                    
                }
                
            </div>
        )
    }
}