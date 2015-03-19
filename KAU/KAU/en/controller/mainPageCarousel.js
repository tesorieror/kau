/**
 * New node file
 */
app.controller('mainPageCarouselCtrl', function($scope) {
	$scope.myInterval = 2000;

	var slides = $scope.slides = [];

	 slides.push({
	 image : './img/1.png',
	 title : '5 QS STARS',
	 text : 'Overall Excellence 2014',
	 });
	 slides.push({
	 image : './img/2.png',
	 title : '5 QS STARS',
	 text : 'Rated for Employability 2014',
	 });
	 slides.push({
	 image : './img/3.png',
	 title : '5 QS STARS',
	 text : 'Rated for Teaching 2014',
	 });
	 slides.push({
	 image : './img/4.png',
	 title : '5 QS STARS',
	 text : 'Rated for Internationalization 2014',
	 });
	 slides.push({
	 image : './img/5.png',
	 title : '5 QS STARS',
	 text : 'Rated for Access 2014',
	 });
	 slides.push({
	 image : './img/6.png',
	 title : '5 QS STARS',
	 text : 'Rated for Facilities 2014',
	 });
	 slides.push({
	 image : './img/7.png',
	 title : '5 QS STARS',
	 text : 'Rated for Innovation 2014',
	 });
	 slides.push({
	 image : './img/8.png',
	 title : '3 QS STARS',
	 text : 'Rated for Research 2014',
	 });
	 slides.push({
	 image : './img/9.png',
	 title : '2 QS STARS',
	 text : 'Rated for Social Science and Management 2014',
	 });

//	$scope.addSlide = function() {
//		var newWidth = 600 + slides.length + 1;
//		slides.push({
//			image : 'http://placekitten.com/' + newWidth + '/300',
//			text : [ 'More', 'Extra', 'Lots of', 'Surplus' ][slides.length % 4] + ' ' + [ 'Cats', 'Kittys', 'Felines', 'Cutes' ][slides.length % 4]
//		});
//	};

//	for (var i = 0; i < 4; i++) {
//		$scope.addSlide();
//	}

});