var app = angular.module("GuessWordApp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){
	
	var words = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", 
	"Antarctica", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", 
	"Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
	"Bermuda", "Bhutan", "Bolivia", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
	"Burundi", "Cambodia", "Cameroon", "Canada", "Chad", "Chile", "China", "Colombia", "Comoros", 
	"Croatia", "Cuba", "Cyprus", "Denmark", "Djibouti", "Dominica", "Ecuador", "Egypt", "Eritrea", 
	"Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", 
	"Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", 
	"Guernsey", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", 
	"Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jersey", 
	"Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", 
	"Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
	"Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Martinique", 
	"Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
	"Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", 
	"Nicaragua", "Niger", "Nigeria", "Niue", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Paraguay", 
	"Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
	"Samoa", "Senegal", "Serbia", "Seychelles", "Singapore", "Slovakia", "Slovenia", "Somalia", 
	"Spain", "SriLanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", 
	"Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Tunisia", "Turkey", 
	"Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", 
	"Vietnam", "Yemen", "Zambia", "Zimbabwe" ];
	$scope.incorrectLettersChosen=[];
	$scope.correctLettersChosen=[];
	$scope.guesses = 6;
	$scope.displayWord = '';
	$scope.input = {
		letter : ''
	}

	var selectRandomWord = function(){
		var index = Math.floor(Math.random()*words.length);
		return words[index];
	}

	var newGame = function(){
		// Initializing game
		$scope.incorrectLettersChosen = [];
		$scope.correctLettersChosen = [];
		$scope.guesses = 6;
		$scope.displayWord = '';

		selectedWord = selectRandomWord();
		var tempDisplayWord = '';
		for (var i =0; i < selectedWord.length; i++){
			tempDisplayWord +='*';
		}
		$scope.displayWord = tempDisplayWord;
	}

	$scope.letterChosen = function(){
		for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
			if($scope.correctLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()){
				$scope.input.letter = "";
				return;
			}
		}

		for (var i = 0; i < $scope.incorrectLettersChosen.length; i++) {
			if($scope.incorrectLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()){
				$scope.input.letter = "";
				return;
			}
		}

		var correct = false;
		for (var i = 0; i < selectedWord.length; i++) {
			if(selectedWord[i].toUpperCase()==$scope.input.letter.toUpperCase()){
				$scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
				correct = true;
			}
		}

		if(correct){
			$scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
		}else{
			$scope.guesses--;
			$scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
		}
		$scope.input.letter="";

		if($scope.guesses == 0){
			$timeout(function(){
				swal("Oops...", selectedWord.toUpperCase(), "error");
				newGame();
			},500)
		}

		if($scope.displayWord.indexOf("*")==-1){
			$timeout(function(){
				swal("Good job!", selectedWord.toUpperCase(), "success");
				newGame();
			},500)
		}

	}

	newGame();

}]);