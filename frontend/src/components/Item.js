import React, { Component } from 'react'
import { connect } from 'react-redux';
import { add, remove } from '../actions/productActions'

class Item extends Component {
	add = () => {
		if(this.props.item.quantity < 99){
			this.props.add(this.props.id, this.props.item.price);
		}
	}

	remove = () => {
		if(this.props.item.quantity > 0){
			this.props.remove(this.props.id, this.props.item.price);
		}
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-6">
						<div className="row">
							<div className="col-5">
								<img src={this.props.item.picture} alt={this.props.item.name} width="100%" />
							</div>

								<div className="col-7 center">
									<div><b>{this.props.item.name}</b></div>
									<div><span className="textgrey bolded500" style={{fontSize: '0.9em'}}>{this.props.item.info}</span></div>
								</div>
							</div>

					</div>
					<div className="col-3 d-flex justify-content-between">
						<div className="d-flex align-items-center">
							<button type="button" className="btn grey" onClick={this.remove}>
								<i className="small material-icons">remove</i>
							</button>
						</div>
						<div className="d-flex align-items-center">
							<span className="bolded500">{this.props.item.quantity}</span>
						</div>
						<div className="d-flex align-items-center">
							<button type="button" className="btn green" onClick={this.add}>
								<i className="small material-icons">add</i>
							</button>
						</div>
					</div>
					<div className="col-3 d-flex flex-row-reverse align-items-center">
						<span className="bolded500">{(this.props.item.quantity * this.props.item.price).toFixed(2)} PLN</span>
					</div>
				</div>
				<hr/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	let id = ownProps.id;
	return {
		item: state.products.find(product => product.id === id)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		add: (id, price) => dispatch(add(id, price)),
		remove: (id, price) => dispatch(remove(id, price))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
