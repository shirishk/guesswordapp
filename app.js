var app = angular.module("GuessWordApp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){
	
	var cities = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", 
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

	var words = ["about", "above", "act", "add", "address", "after", "again", "air", "all", "almost", 
	"alone", "also", "always", "am", "an", "and", "animal", "answer", "ant", "any", "ape", "apple", 
	"are", "arm", "art", "as", "ask", "at", "ate", "away", "ax", "baby", "back", "bad", "ball", "ban", 
	"barn", "bat", "bay", "be", "beach", "bead", "bear", "because", "bed", "bee", "been", "beep", "before", 
	"began", "begin", "bell", "bend", "bent", "best", "better", "big", "bird", "birthday", "black", "blue", 
	"boo", "book", "boss", "both", "boy", "bring", "brown", "bug", "bull", "bunny", "bus", "but", "buy", 
	"by", "cab", "cake", "calf", "call", "came", "camel", "can", "candy", "cap", "car", "care", "carry", 
	"cat", "chicken", "child", "children", "Christmas", "church", "circle", "city", "clean", "close", 
	"cold", "color", "colt", "come", "coming", "cookie", "cop", "cost", "could", "count", "cow", "crab", 
	"crayon", "cry", "cub", "cup", "cut", "dad", "daddy", "dam", "dark", "day", "deer", "did", "dinosaur", 
	"do", "dog", "doll", "donkey", "door", "dot", "dove", "down", "draw", "dream", "dress", "drive", "drop", 
	"duck", "Easter", "easy", "eat", "eel", "egg", "eight", "elephant", "elk", "end", "ever", "every", "eye", 
	"face", "fad", "fall", "family", "fan", "farm", "farmer", "father", "fed", "feel", "feeling", "few", 
	"fight", "fill", "find", "fire", "fireman", "fish", "fit", "fire", "floor", "flower", "fly", "food", 
	"foot", "for", "found", "four", "fox", "free", "freely", "frog", "from", "full", "fun", "fur", "game", 
	"gap", "garden", "gave", "gee", "get", "ghost", "gift", "giraffe", "girl", "give", "glad", "go", 
	"goat", "gold", "golden", "goldfish", "good", "goose", "got", "grass", "great", "green", "grow", "gum", 
	"gun", "had", "hair", "ham", "hand", "happy", "hard", "has", "hat", "have", "hay", "he", "head", "health", 
	"hear", "heard", "heart", "hello", "help", "hen", "her", "here", "hers", "hey", "hi", "high", "hill", "him", 
	"hippo", "his", "hit", "hog", "hole", "holiday", "home", "hop", "hope", "horse", "hot", "house", "how", 
	"hurt", "I", "ice", "if", "in", "is", "it", "jam", "jar", "jet", "job", "juice", "jump", "keep", "key", 
	"kid", "kind", "king", "kiss", "kite", "kitten", "koala", "lad", "lamb", "land", "lap", "large", "lass", 
	"last", "late", "led", "leg", "lend", "let", "light", "like", "line", "lion", "lit", "little", "log", 
	"look", "lose", "loss", "lost", "lot", "love", "low", "lucky", "mad", "made", "make", "making", "mall", 
	"man", "mat", "may", "me", "meet", "meow", "miss", "mom", "mommy", "money", "monkey", "moose", "more", 
	"mother", "mouse", "move", "music", "my", "name", "nap", "neat", "never", "new", "next", "nine", "no", 
	"not", "now", "number", "nurse", "nut", "of", "off", "oil", "OK", "old", "on", "one", "only", "open", 
	"or", "orange", "our", "out", "over", "owl", "ox", "pad", "pal", "pan", "panda", "paper", "party", "pass", 
	"pat", "pay", "people", "picture", "pie", "pig", "pin", "pizza", "plant", "plate", "play", "please", "pole", 
	"pony", "poor", "pop", "pot", "present", "price", "pull", "pumpkin", "pup", "puppy", "purple", "put", "quack", 
	"queen", "quiet", "rabbit", "ram", "ran", "rat", "read", "red", "reindeer", "rent", "rich", "ride", "right", 
	"rip", "river", "road", "rob", "robin", "robot", "rock", "rocket", "room", "round", "row", "rule", "run", 
	"sad", "safe", "said", "same", "saw", "say", "school", "sea", "seal", "see", "sell", "send", "sent", "set", 
	"seven", "she", "sheep", "shoe", "shy", "sick", "side", "sit", "six", "skunk", "sky", "sleep", "small", "snow", 
	"snowball", "snowman", "so", "soft", "some", "son", "song", "soon", "spider", "spring", "stand", "star", 
	"stick", "sticker", "sticky", "stood", "stop", "store", "story", "strong", "summer", "sun", "sunny", "sure", 
	"sweet", "swim", "tractor", "tab", "table", "tag", "take", "talk", "tall", "tan", "tap", "tax", "tell", 
	"ten", "tend", "than", "that", "the", "their", "them", "then", "these", "they", "thing", "things", "this", 
	"three", "tiger", "to", "today", "toe", "told", "top", "town", "toy", "train", "tree", "tricycle", "tried", 
	"true", "try", "tummy", "turkey", "TV", "two", "under", "up", "us", "use", "used", "van", "very", "wait", 
	"walk", "wall", "want", "was", "water", "wave", "wax", "way", "we", "wed", "week", "well", "went", "were", 
	"wet", "what", "when", "white", "White ", "House", "who", "why", "will", "win", "winter", "wish", "witch", 
	"with", "wolf", "woman", "women", "word", "work", "worm", "wow", "write", "yard", "yea", "yell", "yellow", 
	"yes", "you", "your", "zebra", "zero", "zip", "zipper", "zoo"];
	
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
		var tempDisplayWord = selectedWord[0].toUpperCase();
		for (var i =1; i < selectedWord.length; i++){
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
			$scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
			$scope.guesses= $scope.guesses - 1;
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