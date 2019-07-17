export const fetchProducts = () => {
	return dispatch => {
		fetch('http://localhost:8000/api/products')
		.then(res => res.json())
		.then(data => {
			const products = data.map( el => {
			  let o = Object.assign({}, el);
			  o.quantity = 0;
			  return o;
			})
			Promise.all(products).then(products => {
				dispatch({ type: 'FETCH_PRODUCTS', products})
			})
		}).catch(err => {
			dispatch({ type: 'ERROR', err })
		})
	}
}

export const add = (id, price) => {
	return (dispatch, getState) => {
		const products = getState().products;
		const newTotal = getState().total + price;
		const newProducts = products.map(i =>
			i.id === id
				? { ...i, quantity: i.quantity+1 }
				: i
		)
		dispatch({ type: 'ADD', newProducts, newTotal })
	}
}

export const remove = (id, price) => {
	return (dispatch, getState) => {
		const products = getState().products;
		const newTotal = getState().total - price;
		const newProducts = products.map(i =>
			i.id === id
				? { ...i, quantity: i.quantity-1 }
				: i
		)
		dispatch({ type: 'REMOVE', newProducts, newTotal })
	}
}

export const reset = () => {
	return (dispatch, getState) => {
		const products = getState().products;
		const newProducts = products.map(i =>
			i ? { ...i, quantity: 0 }: i
		)
		dispatch({ type: 'RESET', newProducts })
	}
}

export const buyNow = (customerName) => {
	return (dispatch, getState) => {
		console.log(getState())
		const total = getState().total;

		let data = {'customerName': customerName, 'total': total}

		fetch('http://localhost:8000/api/orders/', {
			method: 'POST',
			headers: {
            'Content-Type': 'application/json',
      },
			body: JSON.stringify(data)
		}).then(res => res.json()).then(response => {

			const orderId = response.id;

			data = getState().products.filter(p => {
				return p.quantity > 0;
			}).map(p => {
				return {'quantity': p.quantity, 'order': orderId, 'product': p.id};
			})

			Promise.all(data).then(data => {
				console.log(data)
				fetch('http://localhost:8000/api/productOrder/', {
					method: 'POST',
					headers: {
		            'Content-Type': 'application/json',
		      },
					body: JSON.stringify(data)
				}).then(res => res.json()).then(response => {
					dispatch(reset())
					dispatch({ type: 'SUCCESS', })
				})
			})
		}).catch(err => {
			dispatch({ type: 'ERROR', err })
		})
	}
}
