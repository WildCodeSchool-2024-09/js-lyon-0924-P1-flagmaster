document.getElementById("start-button").addEventListener("click", () => {
	const mainSection = document.querySelector(".carte");
	mainSection.innerHTML = "";

	const avatarImg = document.createElement("img");
	avatarImg.src = "/images/avatar.png";
	avatarImg.alt = "Avatar";
	avatarImg.classList.add("avatar");
	mainSection.appendChild(avatarImg);

	const authentication = document.createElement("h2");
	authentication.textContent = "Enter your name";
	mainSection.appendChild(authentication);
	authentication.style.paddingBottom = "0";

	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.id = "player-name";
	nameInput.placeholder = "Nadarkhily Wild";
	mainSection.appendChild(nameInput);
	nameInput.style.fontSize = "x-large";
	nameInput.style.borderRadius = "1vw";
	nameInput.style.border = "none";
	nameInput.style.padding = "1em";
	nameInput.style.width = "10em";

	const readyButton = document.createElement("button");
	readyButton.textContent = "Ready !";
	readyButton.classList.add("readyButton");
	readyButton.style.paddingLeft = "1em";
	readyButton.style.paddingRight = "1em";
	readyButton.style.paddingTop = "2vw";
	readyButton.style.paddingBottom = "2vw";
	readyButton.style.borderRadius = "3vw";
	readyButton.style.border = "none";
	readyButton.style.backgroundColor = "#724def";
	readyButton.style.fontSize = "xx-large";
	readyButton.style.color = "white";
	readyButton.style.fontFamily = "Pacifico, cursive";

	mainSection.appendChild(readyButton);

	readyButton.addEventListener("click", startQuiz);
});

let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

document
	.getElementById("give-up-button")
	.addEventListener("click", displayGiveUpMessage);

function displayGiveUpMessage() {
	const mainSection = document.querySelector(".carte");
	mainSection.innerHTML = "";

	const message = document.createElement("h2");
	message.textContent = "You're not a real Wilder!";
	mainSection.appendChild(message);
}

const progressBar = document.getElementById("progress-bar");

function startQuiz() {
	playerName = document.getElementById("player-name").value;
	if (!playerName) {
		alert("Enter your name before starting");
		return;
	}
	document.querySelector(".carte").innerHTML = "";
	progressBar.style.width = "4%";
	createQuestion();
}

const questions = [
	{
		question: "Where does this flag fly?",
		picture: "images/om.png",
		options: ["Oman", "Yemen", "Qatar", "Bahrain"],
		correct: "Oman",
	},
	{
		question: "Where does this flag fly?",
		picture: "images/pr.png",
		options: ["Uruguay", "Paraguay", "Bolivia", "Ecuador"],
		correct: "Paraguay",
	},
	{
		question: "Where does this flag fly?",
		picture: "images/kh.png",
		options: ["Cambodia", "Thailand", "Vietnam", "Laos"],
		correct: "Cambodia",
	},
	{
		question: "Where does this flag fly?",
		picture: "images/ge.png",
		options: ["Armenia", "Georgia", "Azerbaijan", "Ukraine"],
		correct: "Georgia",
	},
	{
		question: "Where does this flag fly?",
		picture: "images/al.png",
		options: ["Albania", "Kosovo", "Montenegro", "North Macedonia"],
		correct: "Albania",
	},
	{
		question: "Where does this flag fly?",
		picture: "images/mn.png",
		options: ["Barbados", "Jamaica", "Mongolia", "Saint Lucia"],
		correct: "Mongolia",
	},
	{
		question: "Where does this flag fly?",
		picture: "images/lu.png",
		options: ["Netherlands", "Luxembourg", "Belgium", "Austria"],
		correct: "Luxembourg",
	},
	{
		question: "Where does this flag fly?",
		picture: "images/kw.png",
		options: ["Kuwait", "Qatar", "United Arab Emirates", "Jordan"],
		correct: "Kuwait",
	},
	{
		question: "Where does this flag fly?",
		picture: "images/is.png",
		options: ["Iceland", "Norway", "Finland", "Sweden"],
		correct: "Iceland",
	},
	{
		question: "Where does this flag fly?",
		picture: "images/dz.png",
		options: ["Morocco", "Algeria", "Tunisia", "Egypt"],
		correct: "Algeria",
	},
];

function createQuestion() {
	const mainSection = document.querySelector(".carte");

	mainSection.innerHTML = "";

	const currentQuestion = questions[currentQuestionIndex];

	const imgFlag = document.createElement("img");
	imgFlag.src = currentQuestion.picture;
	imgFlag.alt = "flag";
	imgFlag.classList.add("flag-image");
	imgFlag.style.width = "12em";
	mainSection.appendChild(imgFlag);

	const question = document.createElement("h3");
	question.textContent = currentQuestion.question;
	mainSection.appendChild(question);

	for (const option of currentQuestion.options) {
		const optionButton = document.createElement("button");
		optionButton.textContent = option;
		optionButton.classList.add("option-button");
		optionButton.style.height = "4em";
		optionButton.style.width = "20em";
		optionButton.style.borderRadius = "1vw";
		optionButton.style.border = "none";
		optionButton.addEventListener("click", (event) =>
			checkAnswer(option, event.target),
		);
		mainSection.appendChild(optionButton);
	}

	const nextButton = document.createElement("button");
	nextButton.textContent = "Next";
	nextButton.id = "next-button";
	nextButton.style.display = "none";

	nextButton.style.paddingLeft = "1em";
	nextButton.style.paddingRight = "1em";
	nextButton.style.marginTop = "2vh";
	nextButton.style.marginBottom = "1vh";
	nextButton.style.borderRadius = "2vw";
	nextButton.style.border = "none";
	nextButton.style.backgroundColor = "#724def";
	nextButton.style.fontSize = "large";
	nextButton.style.color = "white";
	nextButton.style.fontFamily = "Pacifico, cursive";

	nextButton.addEventListener("click", loadNextQuestion);
	mainSection.appendChild(nextButton);
}

function checkAnswer(selectedOption, buttonElement) {
	const currentQuestion = questions[currentQuestionIndex];
	const nextButton = document.querySelector("#next-button");

	for (const button of document.querySelectorAll(".option-button")) {
		button.disabled = true;
	}

	if (selectedOption === currentQuestion.correct) {
		buttonElement.style.backgroundColor = "green";
		buttonElement.style.color = "white";
		score++;
	} else {
		buttonElement.style.backgroundColor = "red";
		buttonElement.style.color = "white";

		for (const button of document.querySelectorAll(".option-button")) {
			if (button.textContent === currentQuestion.correct) {
				button.style.backgroundColor = "green";
				button.style.color = "white";
			}
		}
	}
	nextButton.style.display = "block";
}

function loadNextQuestion() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		progressBar.style.width = `${4 + currentQuestionIndex * 10}%`; // progressBar.style.width = (4 + (currentQuestionIndex * 10)) + "%";
		createQuestion();
	} else {
		progressBar.style.width = "100%";
		const mainSection = document.querySelector(".carte");
		mainSection.innerHTML = "";

		const scoreFinal = document.createElement("h2");
		scoreFinal.textContent = `Bravo ${playerName}! Quiz finished! Your score is ${score} out of 10`; // scoreFinal.textContent = "Quiz finished! Your score: " + score;

		mainSection.appendChild(scoreFinal);
		const restartButton = document.createElement("button");
		restartButton.textContent = "Restart";
		restartButton.id = "restart-button";

		restartButton.style.paddingLeft = "1em";
		restartButton.style.paddingRight = "1em";
		restartButton.style.marginTop = "2vh";
		restartButton.style.marginBottom = "1vh";
		restartButton.style.borderRadius = "2vw";
		restartButton.style.border = "none";
		restartButton.style.backgroundColor = "#724def";
		restartButton.style.fontSize = "xx-large";
		restartButton.style.color = "white";
		restartButton.style.fontFamily = "Pacifico, cursive";

		restartButton.addEventListener("click", () => {
			currentQuestionIndex = 0;
			score = 0;
			createQuestion();
		});
		mainSection.appendChild(restartButton);
	}
}
