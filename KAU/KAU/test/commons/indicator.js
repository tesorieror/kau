var DATA_JSON = '../test/json/';

function Indicator() {
	category: null;
	subcategory: null;
	subsubcategory: null;
	filter: null;
	group: null;
	years: [];
}

Indicator.prototype.getTitle = function() {
	var answer = '';
	answer = answer + (this.filter ? (this.filter + ' ') : '');
	answer = answer + (this.subsubcategory ? (this.subsubcategory + ' ') : '');
	answer = answer + (this.group ? (this.group + ' ') : '');
	answer = answer + (this.subcategory ? (this.subcategory + ' ') : '');
	answer = answer + (this.category ? (this.category + ' ') : '');
	return answer.toLowerCase().firstToUpper();
}

Indicator.prototype.getSubTitle = function() {
	var answer = '';
	if (this.years) {
		answer = answer + ' (' + this.years[this.years.length - 1] + ' to '
				+ this.years[0] + ')';
	}
	return answer.toLowerCase().firstToUpper();
}

Indicator.prototype.setPeriod = function(p) {
	this.years = p.getPeriod();
}

Indicator.prototype.setValuesFromArray = function(arr) {
	this.category = ('category' in arr) ? arr['category'] : this.category;
	this.subcategory = ('subcategory' in arr) ? arr['subcategory']
			: this.subcategory;
	this.subsubcategory = ('subcategory' in arr) ? arr['subsubcategory']
			: this.subsubcategory;
	this.filter = ('filter' in arr) ? arr['filter'] : this.filter;
	this.group = ('group' in arr) ? arr['group'] : this.group;
	this.years = ('years' in arr) ? arr['years'] : this.years;
}

Indicator.prototype.getDataFilenames = function() {
	var category = this.category.toLowerCase();
	var subcategory = this.subcategory.toLowerCase();
	// var subsubcategoty = this.subsubcategory.toLowerCase();
	// var filter = this.filter.toLowerCase();
	var result = [];
	angular.forEach(this.years, function(yr) {
		result.push(DATA_JSON + yr + '_' + category + '_' + subcategory
				+ '_data.json')
	});
	return result;
}

Indicator.prototype.getDescriptionFilenames = function() {
	var category = this.category.toLowerCase();
	var subcategory = this.subcategory.toLowerCase();
	// var subsubcategoty = this.subsubcategory.toLowerCase();
	// var filter = this.filter.toLowerCase();
	var result = [];
	for (yr in this.years)
		result.push(DATA_JSON + years[yr] + '_' + category + '_' + subcategory
				+ '_desc.json');
	return result;
}