import { Component, PropTypes } from 'react'

export class Admin extends Component {
    
    
    render(){
        const updateBonus = ()=>{
            if(this.props.bonus){
                this.props.setBonus(false);
            }else{
                this.props.setBonus(true);
            }
        }
        const addBonusLimit = () => {
            this.props.setBonusLimit(this.props.bonusLimit + 1)
        }
        const minusBonusLimit = () => {
            if(this.props.bonusLimit > 0){
                this.props.setBonusLimit(this.props.bonusLimit - 1)
            }
        }
        const addDiscount = () => {
            if(this.props.discount < .90){
                var value = parseFloat(this.props.discount.toFixed(2)) + parseFloat(0.05.toFixed(2));
                this.props.setDiscount(value);
            }
        }
        const minusDiscount = () => {
            if(this.props.discount > 0){
                var value = parseFloat(this.props.discount.toFixed(2)) - parseFloat(0.05.toFixed(2));
                this.props.setDiscount(value);
            }
        }
        return (
            <div className="container">
                <h1 className="jumbotron" ><center>Admin</center></h1>
                <legend>Set Promo and Discount</legend>
                <div className="">
                    <div>Set Bonus: {this.props.bonus.toString()}</div><input className="form-group" type="checkbox"  checked={this.props.bonus} onChange={updateBonus} />
                </div>
                <div className="">
                    <div>Set Bonus Limit: {this.props.bonusLimit} item(s) to buy to have 1 item free</div>
                    
                    {(this.props.bonusLimit < 2) ? <button className="btn btn-warning btn-sm disabled">minus</button>: <button onClick={minusBonusLimit} className="btn btn-warning btn-sm">minus</button>}

                    <button onClick={addBonusLimit} className="btn btn-info btn-sm">plus</button>
                </div>
                <div className="">
                    <div>Set Discount: {(parseFloat(this.props.discount.toFixed(2)) * 100).toFixed(2)} % </div>
                    {(this.props.discount == 0 || this.props.discount < 0) ? <button className="btn btn-warning btn-sm disabled">minus</button>: <button onClick={minusDiscount} className="btn btn-warning btn-sm">minus</button>}
                    {(this.props.discount == .90) ? <button className="btn btn-info btn-sm disabled">plus</button>: <button onClick={addDiscount} className="btn btn-info btn-sm">plus</button>}
                </div>
            </div>
        )
    }
}

Admin.propTypes = {
    discount: PropTypes.number.isRequired,
    bonus: PropTypes.bool.isRequired,
    bonusLimit: PropTypes.number.isRequired,
    setDiscount: PropTypes.func.isRequired,
    setBonus: PropTypes.func.isRequired,
    setBonusLimit: PropTypes.func.isRequired
}