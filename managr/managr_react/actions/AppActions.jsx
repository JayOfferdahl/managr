
export function djangoDataFetchSuccess(django_string) {
	return {
		type: 'DJANGO_DATA_FETCH_SUCCESS',
		django_string
	};
}

export function djangoDataFetch(api_endpoint) {
	return (dispatch) => {
		fetch(api_endpoint)
			.then((response) => {
				return response;
			})
			.then((response) => response.json())
			.then((data) => dispatch(djangoDataFetchSuccess(data['django_string'])));
	};
}
