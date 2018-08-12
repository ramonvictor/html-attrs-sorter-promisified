var posthtml = require('posthtml');
var attrsSorter = require('posthtml-attrs-sorter');
var attrsSorterOptions = {};

/**
 * Overrides 'posthtml-attrs-sorter' default configuration.
 * Useful to change order priorities.
 * @public
 *
 * @param {Object} options - Options that overrides default.
 * @param {Object[]} options.order - List of attribute names ordered by priority.
 */
function updateDefaultAttrsSorterOptions(options) {
	attrsSorterOptions = options;
}

/**
 * Get HTML string result, with sorted attributes.
 * @private
 *
 * @param {string} htmlInput
 * @returns {Promise}
 */
function getSortedResult(htmlInput) {
	return new Promise(function(resolve, reject) {
		posthtml()
		  .use(attrsSorter(attrsSorterOptions))
		  .process(htmlInput)
		  .then(function(result) {
		  		resolve(result.html);
		  })
	})
}

/**
 * Receives `N` HTML string arguments and returns Promise
 * that will output sorted version of given HTML strings.
 *
 * @public
 * @returns {Promise}
 */
function attributesSorting() {
	var args = [].slice.call(arguments);
	return Promise.all(args.map(function(input) {
		return getSortedResult(input);
	}));
}

module.exports = {
	updateDefaultAttrsSorterOptions: updateDefaultAttrsSorterOptions,
	attributesSorting: attributesSorting
}
