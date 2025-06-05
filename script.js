        // Your existing JavaScript code here
        let score = 0;
        let currentQuestionIndex = 0;
        const answerButtons = document.getElementById('answer-buttons');
        const quizQuestions = document.querySelector('.quizquestions');
        const question = document.getElementById('question');
        const questionnum = document.querySelector('.question-num')
        const next = document.getElementById('next');
        const presentScore= document.getElementById('presentScore');
        const timer = document.querySelector('.timer');
        const musictxt = document.querySelector('#musictxt');
        const music = document.querySelector('.music');
        const musicSrc = document.querySelector('#music-src');
        const startPage = document.querySelector('#start-page');
        const startBtn = document.getElementById('start');
        const hallbtn = document.querySelector('#hall');
        const quizBox = document.querySelector('.quizbox');
        const backButton = document.querySelector('#back');
        const highScoreElement = document.querySelector('#high-scores');
        const highScore1 = document.querySelector('#high1');
        const highScore2 = document.querySelector('#high2');
        const highScore3 = document.querySelector('#high3');
        const highScore4 = document.querySelector('#high4');
        const highScore5 = document.querySelector('#high5');
        const hallInput = document.querySelector('#hallinput');
        const inputBtn = document.querySelector('#inputBtn');
        const playagainBtn = document.querySelector('#playagainbtn');

        const questions =[
            {
                question:"Which of these is not a starter pokemon?",
                answers: [
                    {text: 'Torchic', correct: false},
                    {text: 'Cyndaquil', correct: false},
                    {text: 'Golem', correct: true},
                    {text: 'Totodile', correct: false},
                ]
            },
            {
                question:"Which of these has psychic abilities?",
                answers: [
                    {text: 'Scyther', correct: false},
                    {text: 'Houndoom', correct: false},
                    {text: 'Exeggutor', correct: true},
                    {text: 'Ivysaur', correct: false},
                ]
            },
            {
                question:"Which of these is in its most evolved version?",
                answers: [
                    {text: 'Bellosom', correct: true},
                    {text: 'Nidorina', correct: false},
                    {text: 'Golbat', correct: false},
                    {text: 'Poliwhirl', correct: false},
                ]
            },
            {
                question:"Which of these moves is supereffective against a water pokemon?",
                answers: [
                    {text: 'Giga Drain', correct: true},
                    {text: 'Seismic Toss', correct: false},
                    {text: 'Horn Attack', correct: false},
                    {text: 'Dreameater', correct: false},
                ]
            },
            {
                question:"Which of these pokemon does not evolve?",
                answers: [
                    {text: 'Kabuto', correct: false},
                    {text: 'Dragonair', correct: false},
                    {text: 'Tropius', correct: true},
                    {text: 'Sentret', correct: false},
                ]
            },
            {
                question:"Which of these do I use to increase the level of the pokemon?",
                answers: [
                    {text: 'Red Shard', correct: false},
                    {text: 'Black Glasses', correct: false},
                    {text: 'Moon Stone', correct: false},
                    {text: 'Rare Candy', correct: true},
                ]
            },
            {
                question:"Which of these gym leaders specialize in grass type?",
                answers: [
                    {text: 'Lt. Surge', correct: false},
                    {text: 'Misty', correct: false},
                    {text: 'Erika', correct: true},
                    {text: 'Koga', correct: false},
                ]
            },
            {
                question:"Which of these pokemon has a weakness for psychic moves?",
                answers: [
                    {text: 'Jynx', correct: false},
                    {text: 'Tyrogue', correct: true},
                    {text: 'Starmie', correct: false},
                    {text: 'Bellsprout', correct: false},
                ]
            },
            {
                question:"Which pokemon is Eevee's psychic evolution?",
                answers: [
                    {text: 'Umbreon', correct: false},
                    {text: 'Flareon', correct: false},
                    {text: 'Espeon', correct: true},
                    {text: 'Glaceon', correct: false},
                ]
            },
            {
                question:"Which of these moves is supereffective against Jynx?",
                answers: [
                    {text: 'Earthquake', correct: false},
                    {text: 'Water Gun', correct: false},
                    {text: 'Hyper Fang', correct: false},
                    {text: 'Bite', correct: true},
                ]
            }
        ];
        
        let countdown = 10; 
        let highScoreName = hallInput.value;
        let mytimeout = setTimeout(time, 2000);

        startBtn.addEventListener('click', startQuiz);
        hallInput.addEventListener('keydown', showInputValue2);
        backButton.addEventListener('click',backbtn);
        playagainBtn.addEventListener('click',playAgain);
        hallbtn.addEventListener('click', fame);
        next.addEventListener('click', nextQ);
        inputBtn.addEventListener('click', saveHighScore);

        function startQuiz() {
            startPage.style.display = "none";
            quizBox.style.display = "block";
            quizQuestions.style.display = 'block';
            inputBtn.style.display = 'none';
            highScoreElement.style.display = 'none'; 
            countdown = 10;
            time(); 
            currentQuestionIndex = 0;
            score = 0;
            presentScore.innerHTML = 0;
            questions.sort(() => Math.random() - 0.5);
            const selectedQuestions = questions.slice(0, 5);
            questions.splice(0, questions.length, ...selectedQuestions);
            next.innerHTML = 'Next';
            showQuestion();
        }

        function backbtn(){
            startPage.style.display = "block";
            inputBtn.style.display = 'none';
            hallInput.style.display = 'none';
            quizBox.style.display = "none";
            highScoreElement.style.display = 'none';
            playagainBtn.style.display = 'none';
        }

        function playAgain(){
            hallInput.style.display = 'none';
            inputBtn.style.display = 'none';
            highScoreElement.style.display = 'none';
            startPage.style.display = "block";
            quizBox.style.display = "none"; 
            playagainBtn.style.display = 'none';
        }

        function saveHighScore() {
            let highScoreName = hallInput.value.trim();
            if (highScoreName) {
                const highScores = getHighScores();
                highScores.push({ name: highScoreName, score: score });
                highScores.sort((a, b) => b.score - a.score);
                highScores.splice(5);
                localStorage.setItem('highScores', JSON.stringify(highScores));
                displayHighScores();
            }
        }

        function getHighScores() {
            const scores = localStorage.getItem('highScores');
            return scores ? JSON.parse(scores) : [];
        }

        function displayHighScores() {
            const highScores = getHighScores().slice(0, 5);  
            const highScoreElements = [highScore1, highScore2, highScore3, highScore4, highScore5];
            highScores.forEach((score, index) => {
                if (highScoreElements[index]) {
                    highScoreElements[index].textContent = `${score.name}: ${score.score}`;
                }
            });

            for (let i = highScores.length; i < highScoreElements.length; i++) {
                if (highScoreElements[i]) {
                    highScoreElements[i].textContent = '';
                }
            }
        }

        function fame() {
            quizBox.style.display = 'none';
            startPage.style.display = 'none';
            highScoreElement.style.display = 'block'; 
            displayHighScores();
        } 

        function time() {
            timer.innerHTML = 'Time left: ' + countdown + 's'; 
            countdown -=1; 
            if (countdown < 0) {
                timer.innerHTML = 'Time\'s up!'; 
                Array.from(answerButtons.children).forEach(button => {
                    if (button.dataset.correct === 'true') {
                        button.classList.add('correct');
                    }
                    button.disabled = true;
                });
                next.style.display = 'block';
            } else {
                mytimeout = setTimeout(time, 1000);
            }
        }
     
        function showInputValue2(e){
            if (e.key === 'Enter') {
                inputBtn.style.display = 'none';
                hallInput.style.display = 'none';
            }
        }
        
        function showQuestion(){
            clearTimeout(mytimeout);
            timer.style.display ='block';
            resetState();
            countdown = 10;
            time();
            let currentQuestion = questions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionnum.innerHTML ='Question ' + questionNo + ' of 5 (shuffled from 10)';
            question.innerHTML = questionNo + '. ' + currentQuestion.question;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerHTML = answer.text;
                button.classList.add('btn');
                answerButtons.appendChild(button);
                if(answer.correct){
                    button.dataset.correct = answer.correct;
                    clearTimeout(mytimeout);
                }
                button.addEventListener('click', selectAnswer);
            });
            next.style.display = 'none';
        }

        function resetState(){
            while(answerButtons.firstChild){
                answerButtons.removeChild(answerButtons.firstChild)
            }
        }

        function selectAnswer(e){
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === 'true';
            if(isCorrect){
                selectedBtn.classList.add('correct');
                score++;
            }else{
                selectedBtn.classList.add('incorrect');
            }

            Array.from(answerButtons.children).forEach(button => {
                if(button.dataset.correct === 'true'){
                    button.classList.add('correct');
                }
                button.disabled = true;
            }); 
            timer.style.display ='none';
            next.style.display = 'block';
        }
             
        function showScore() {
            quizQuestions.style.display = 'none';
            inputBtn.style.display = 'block';
            hallInput.style.display = 'block';
            
            const totalScore = document.createElement('h1');
            totalScore.setAttribute('id', 'total-score');
            totalScore.style.color = 'var(--primary)';
            totalScore.style.textAlign = 'center';
            totalScore.style.marginBottom = '20px';
            quizBox.appendChild(totalScore);
            totalScore.innerHTML = `You scored ${score} out of ${questions.length}!`;
            
            playagainBtn.style.display = 'block';
            next.style.display = 'none';
        }

        function handleNxtbtn() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                clearTimeout(mytimeout);
                showQuestion();
            } else {
                hallInput.style.display = 'block';
                timer.style.display= 'none';
                clearTimeout(mytimeout);
                showScore();
            }
        }

        function nextQ(){
            clearTimeout(mytimeout);
            timer.innerHTML = '';
            presentScore.innerHTML = score;
            if (currentQuestionIndex < questions.length) {
                handleNxtbtn();
                countdown = 10;
                time();
            } else {
                clearTimeout(mytimeout);
                startQuiz();
                timer.style.display='block';
                countdown = 10;
                time();
            }
        }
