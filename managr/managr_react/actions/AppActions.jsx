
export function djangoDataFetchSuccess(django_string) {
	return {
		type: 'DJANGO_DATA_FETCH_SUCCESS',
		django_string
	};
}

export function djangoDataFetch(api_endpoint) {
	return (dispatch) => {
		fetch(api_endpoint, {mode: 'no-cors'})
			.then((response) => {
				console.log(response.status);
			})
			.then((django_string) => dispatch(djangoDataFetchSuccess(django_string)));
	};
}
