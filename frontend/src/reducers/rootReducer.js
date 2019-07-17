const initState = {
	products: [],
	total: 0,
	info: null
}

const rootReducer = (state = initState, action) => {
	switch(action.type){
		case 'FETCH_PRODUCTS':
			return { ...state, products: action.products }
		case 'ADD':
			return { ...state, products: action.newProducts, total: action.newTotal }
		case 'REMOVE':
			return { ...state, products: action.newProducts, total: action.newTotal }
		case 'RESET':
			return { ...state, products: action.newProducts, total: 0, info: null }
		case 'SUCCESS':
			return { ...state, info: 'success' }
		case 'ERROR':
			return { ...state, info: action.err }
		default:
			return state;
	}
}

export default rootReducer;
