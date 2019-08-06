function debounce(fn, wait, immediate = true) {
	let timer;

	const later = (context, args) => setTimeout(() => {
		timer = null;

		if(!immediate){
			fn.apply(context, args);
			//context = args = null;
		}
	}, wait)

	let debounced = function(...params) {
		let context = this;
		let args = params;

		if (!timer) {
			timer = later(context, args);
			if(immediate){
				fn.apply(context, args);
			}
		}else{
			clearTimeout(timer);
			timer = later(context, args);
		}
	}

	debounced.cancel = () => {
       clearTimeout(timer)
       timer = null
	}

	return debounced;
}

export { debounce }