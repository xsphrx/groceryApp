import React, { Component } from 'react'
import Item from './Item';
import { connect } from 'react-redux';
import { reset, fetchProducts, buyNow } from '../actions/productActions'


class Home extends Component {
	state = {
		customer: ''
	}

	componentDidMount() {
		this.props.dispatch(fetchProducts());
	}

	buyNow = () => {
		if(this.state.customer && this.props.total){
			this.props.buyNow(this.state.customer);
		}else {
			this.props.dispatch({ type: 'ERROR', err: 'Create your customer name and add some products!' })
		}
	}

	render() {
		return (
			<div>
				{this.props.info ?
					<div className="alert alert-secondary" role="alert">{this.props.info}</div>
					: null
				}
				<h2 className="mt-5">Grocery app</h2>
				<input type="text" className="noborder mt-3 bolded500" placeholder="Customer name..." style={{fontSize: '1.2em'}} onChange={e => this.setState({customer: e.target.value})}/>
				<hr className="hrsmall"/>
				<div className="row">
					<div className="col-6">
						<span className="textgrey bolded500">Items</span>
					</div>
					<div className="col-3">
						<span className="textgrey bolded500">Quantity</span>
					</div>
					<div className="col-3">
						<div className="float-right">
							<span className="textgrey bolded500">Price</span>
						</div>
					</div>
				</div>
				<hr/>
				{this.props.products.map(item =>
					<Item key={item.id} id={item.id} />
				)}
				<div>
					<span className="textgrey">Total:</span>
					<b className="float-right" style={{color: '#478CBA'}}>
						{this.props.total.toFixed(2)} PLN
					</b>
				</div>
				<div className="mt-5">
					<span>
						<button type="button bolded500" className="btn grey" onClick={this.props.reset}>Reset</button>
					</span>
					<span className="float-right">
						<button type="button bolded500" className="btn lightgrey" onClick={this.buyNow}>Buy now</button>
					</span>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products,
		total: state.total,
		info: state.info
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		reset: () => dispatch(reset()),
		buyNow: (customerName) => dispatch(buyNow(customerName)),
		dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
