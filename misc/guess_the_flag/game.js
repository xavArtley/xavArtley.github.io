// --- CONFIGURATION API v5 ---
const API_KEY = 'rc_live_fc9df64303734f9d84092a75e36067cc';
const BASE_URL = 'https://api.restcountries.com/countries/v5';
const FIELDS = 'codes.alpha_2,names.common,names.translations,flag.url_svg';

const THRESHOLD = 0.85;
const DIFFICULTY_INCREMENT = 0.5;
const MAX_DIFFICULTY = 100;

// État du jeu
let countriesData = [];
let currentCountry = null;
let score = 0;
let totalViews = 0;

// Références DOM
const flagImage = document.getElementById('flag-image');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-guess');
const nextButton = document.getElementById('next-question');
const messageArea = document.getElementById('message-area');
const scoreDisplay = document.getElementById('score');
const viewCountDisplay = document.getElementById('view-count');
const avgDifficultyDisplay = document.getElementById('avg-difficulty');
const resetButton = document.getElementById('reset-game');


// --- LOGIQUE DE PERSISTANCE ---

function loadGameData(initialData) {
    const storedData = localStorage.getItem('flagGameData');
    if (storedData) {
        const storedMap = JSON.parse(storedData).reduce((map, item) => {
            map[item.code] = item;
            return map;
        }, {});

        return initialData.map(country => {
            const code = country.codes?.alpha_2;
            if (storedMap[code]) {
                return {
                    ...country,
                    difficulty: storedMap[code].difficulty || 1,
                    views: storedMap[code].views || 0,
                    correct: storedMap[code].correct || 0
                };
            } else {
                return {
                    ...country,
                    difficulty: 1,
                    views: 0,
                    correct: 0
                };
            }
        });
    }

    return initialData.map(country => ({
        ...country,
        difficulty: 1,
        views: 0,
        correct: 0
    }));
}

function saveGameData() {
    const dataToStore = countriesData.map(country => ({
        code: country.codes?.alpha_2,
        difficulty: country.difficulty,
        views: country.views,
        correct: country.correct
    }));
    localStorage.setItem('flagGameData', JSON.stringify(dataToStore));
}

function updateScoreboard() {
    totalViews = countriesData.reduce((sum, c) => sum + c.views, 0);
    const totalDifficulty = countriesData.reduce((sum, c) => sum + c.difficulty, 0);
    const avgDifficulty = totalDifficulty / countriesData.length;

    scoreDisplay.textContent = score;
    viewCountDisplay.textContent = totalViews;
    avgDifficultyDisplay.textContent = avgDifficulty.toFixed(2);
    saveGameData();
}

function resetGame() {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser le jeu ? Votre score et la difficulté des pays seront perdus.")) {
        localStorage.removeItem('flagGameData');
        score = 0;
        totalViews = 0;
        initGame();
        messageArea.textContent = 'Jeu réinitialisé ! Nouvelle partie lancée.';
        messageArea.className = 'message-default';
    }
}


// --- LOGIQUE DE SÉLECTION PONDÉRÉE ---

function selectRandomCountry() {
    const totalWeight = countriesData.reduce((sum, country) => sum + country.difficulty, 0);
    let randomValue = Math.random() * totalWeight;

    for (const country of countriesData) {
        randomValue -= country.difficulty;
        if (randomValue <= 0) {
            return country;
        }
    }
    return countriesData[Math.floor(Math.random() * countriesData.length)];
}


// --- LOGIQUE DE VÉRIFICATION ---

function checkCountryGuess(guess, correctName_en, correctName_fr, threshold = THRESHOLD) {
    const normalizedGuess = normalizeString(guess);
    const normalizedEn = normalizeString(correctName_en);
    const normalizedFr = normalizeString(correctName_fr);

    if (normalizedGuess.length === 0) return false;

    const scoreEn = jaroWinklerSimilarity(normalizedGuess, normalizedEn);
    const scoreFr = jaroWinklerSimilarity(normalizedGuess, normalizedFr);

    return Math.max(scoreEn, scoreFr) >= threshold;
}


// --- LOGIQUE DE JEU PRINCIPALE ---

function displayNewQuestion() {
    currentCountry = selectRandomCountry();
    currentCountry.views++;

    // v5: Accès via les nouvelles propriétés renvoyées par response_fields
    flagImage.src = currentCountry.flag?.url_svg;
    flagImage.alt = currentCountry.names?.common || 'Drapeau à deviner';

    guessInput.value = '';
    guessInput.disabled = false;
    submitButton.disabled = false;
    nextButton.style.display = 'none';
    messageArea.textContent = '';
    messageArea.className = 'message-default';

    updateScoreboard();
}

function handleGuess() {
    if (!currentCountry) return;

    const userGuess = guessInput.value;
    const nameEn = currentCountry.names?.common;
    const nameFr = currentCountry.translations?.fra?.common
        || currentCountry.names?.translations?.fra?.common
        || nameEn;

    if (checkCountryGuess(userGuess, nameEn, nameFr)) {
        score++;
        currentCountry.correct++;
        currentCountry.difficulty = Math.max(1, currentCountry.difficulty - DIFFICULTY_INCREMENT);
        messageArea.textContent = `Correct ! Le pays est ${nameFr} (${nameEn}).`;
        messageArea.className = 'message-success';
    } else {
        currentCountry.difficulty = Math.min(MAX_DIFFICULTY, currentCountry.difficulty + DIFFICULTY_INCREMENT);
        messageArea.textContent = `Faux. Le pays était ${nameFr} (${nameEn}). Essayez de le retenir !`;
        messageArea.className = 'message-error';
    }

    guessInput.disabled = true;
    submitButton.disabled = true;
    nextButton.style.display = 'block';

    updateScoreboard();
}

// --- INITIALISATION AVEC GESTION DE LA PAGINATION v5 ---
async function initGame() {
    try {
        let allCountries = [];
        let offset = 0;
        let hasMore = true;
        const limit = 100; // Limite maximale autorisée par page sur le plan gratuit

        while (hasMore) {
            const url = `${BASE_URL}?limit=${limit}&offset=${offset}&response_fields=${FIELDS}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}` // Authentification recommandée
                }
            });

            if (!response.ok) {
                throw new Error('Erreur de chargement des données de pays');
            }

            const result = await response.json();
            const objects = result.data?.objects || [];
            allCountries = allCountries.concat(objects);

            // Arrêter la boucle si on a récupéré moins d'objets que la limite ou si on a tout lu
            if (objects.length < limit || allCountries.length >= (result.data?.meta?.total || 250)) {
                hasMore = false;
            } else {
                offset += limit;
            }
        }

        if (allCountries.length === 0) {
            throw new Error('Aucun pays trouvé.');
        }

        countriesData = loadGameData(allCountries);

        // Attacher les événements (une seule fois à l'initialisation globale)
        submitButton.removeEventListener('click', handleGuess);
        submitButton.addEventListener('click', handleGuess);

        nextButton.removeEventListener('click', displayNewQuestion);
        nextButton.addEventListener('click', displayNewQuestion);

        // Éviter les doublons d'écouteurs si initGame est rappelé par resetGame
        resetButton.replaceWith(resetButton.cloneNode(true));
        document.getElementById('reset-game').addEventListener('click', resetGame);

        // Démarrer le jeu
        displayNewQuestion();

    } catch (error) {
        console.error("Initialisation du jeu échouée:", error);
        messageArea.textContent = "Erreur: Impossible de charger les données du jeu. Vérifiez votre clé API v5.";
        messageArea.className = 'message-error';
    }
}

// Note : Assurez-vous que vos fonctions utilitaires (normalizeString, jaroWinklerSimilarity)
// sont bien déclarées ailleurs dans votre script global.
initGame();