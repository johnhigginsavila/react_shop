import { Component, PropTypes } from 'react'

export class Bonus extends Component {
    render(){
        const bonusItems = () => {
            var data = [];
            this.props.groupedItems.forEach((item, index, array) => {
                 if(item.quantity > this.props.bonusLimit && this.props.bonus && this.props.bonusLimit > 1){
                    var newBonusItem = {
                        quantity:Math.floor((item.quantity / this.props.bonusLimit)),
                        productName: item.productName
                    }
                    data.push(newBonusItem)
                }
            })
            return data;
        }
        return (
            <div>
                {
                    (bonusItems().length != 0) ? 
                    <div>
                        <div>Bonus:</div>
                        {bonusItems().map((item, i) => <div key={i}>{item.quantity} {item.productName} Free!</div>)}
                    </div>:null
                }
            </div>
        )
    }
}

Bonus.propTypes = {
    groupedItems : PropTypes.array.isRequired,
    bonusItems : PropTypes.number,
    bonus: PropTypes.bool.isRequired
}
