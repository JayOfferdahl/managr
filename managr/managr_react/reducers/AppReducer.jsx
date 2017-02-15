
export function django_string(state = '', action) {
	switch(action.type) {
		case 'DJANGO_DATA_FETCH_SUCCESS':
			return action.django_string;
		default:
			return state;
	}
}
