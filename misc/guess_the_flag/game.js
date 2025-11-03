const API_URL = 'https://restcountries.com/v3.1/independent?fields=cca2,name,flags,translations,status=true';
const THRESHOLD = 0.85; // Seuil de similarité Jaro-Winkler
const DIFFICULTY_INCREMENT = 0.5; // Augmentation du score de difficulté lors d'une erreur
const MAX_DIFFICULTY = 100; // Cap pour le score de difficulté d'un pays

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


// --- LOGIQUE DE PERSISTANCE (LocalStorage) ---

/**
 * Charge les données de l'historique de jeu ou initialise avec les données par défaut.
 * @param {Array<Object>} initialData La liste des pays bruts chargés de l'API.
 * @returns {Array<Object>} Les données de pays avec les métriques de jeu (difficulty, views, etc.).
 */
function loadGameData(initialData) {
    const storedData = localStorage.getItem('flagGameData');
    if (storedData) {
        // Fusionner les données stockées avec les données de l'API au cas où la liste des pays change
        const storedMap = JSON.parse(storedData).reduce((map, item) => {
            map[item.code] = item;
            return map;
        }, {});

        // Créer le tableau final
        return initialData.map(country => {
            const code = country.cca2;
            if (storedMap[code]) {
                // Utiliser les données stockées pour les métriques de jeu
                return {
                    ...country,
                    difficulty: storedMap[code].difficulty || 1, // Garantir un minimum de 1
                    views: storedMap[code].views || 0,
                    correct: storedMap[code].correct || 0
                };
            } else {
                // Nouveau pays
                return {
                    ...country,
                    difficulty: 1,
                    views: 0,
                    correct: 0
                };
            }
        });
    }

    // Première exécution : initialisation de base
    return initialData.map(country => ({
        ...country,
        difficulty: 1, // Le score de difficulté est la probabilité de base (au moins 1)
        views: 0,
        correct: 0
    }));
}

function saveGameData() {
    // Sauvegarder uniquement les champs de jeu pertinents pour alléger le LocalStorage
    const dataToStore = countriesData.map(country => ({
        code: country.cca2,
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

        // 1. Supprimer l'historique de LocalStorage
        localStorage.removeItem('flagGameData');

        // 2. Réinitialiser le score actuel
        score = 0;
        totalViews = 0;

        // 3. Recharger les données des pays (ce qui réinitialisera la difficulté à 1 pour tous)
        initGame();

        messageArea.textContent = 'Jeu réinitialisé ! Nouvelle partie lancée.';
        messageArea.className = 'message-default';
    }
}


// --- LOGIQUE DE SÉLECTION PONDÉRÉE ---

/**
 * Sélectionne un pays aléatoirement en utilisant le score de difficulté comme poids.
 * @returns {Object} Le pays sélectionné.
 */
function selectRandomCountry() {
    // 1. Calculer le poids total (somme de toutes les difficultés)
    const totalWeight = countriesData.reduce((sum, country) => sum + country.difficulty, 0);

    // 2. Tirer un nombre aléatoire entre 0 et totalWeight
    let randomValue = Math.random() * totalWeight;

    // 3. Trouver le pays correspondant
    for (const country of countriesData) {
        randomValue -= country.difficulty;
        if (randomValue <= 0) {
            return country;
        }
    }
    // Fallback au cas où
    return countriesData[Math.floor(Math.random() * countriesData.length)];
}


// --- LOGIQUE DE VÉRIFICATION ---

/**
 * Vérifie si la réponse du joueur est assez proche. (Utilise Jaro-Winkler de jaro-winkler.js)
 */
function checkCountryGuess(guess, correctName_en, correctName_fr, threshold = THRESHOLD) {
    const normalizedGuess = normalizeString(guess);
    const normalizedEn = normalizeString(correctName_en);
    const normalizedFr = normalizeString(correctName_fr);

    if (normalizedGuess.length === 0) return false;

    // Le joueur gagne s'il est proche du nom EN OU du nom FR
    const scoreEn = jaroWinklerSimilarity(normalizedGuess, normalizedEn);
    const scoreFr = jaroWinklerSimilarity(normalizedGuess, normalizedFr);

    return Math.max(scoreEn, scoreFr) >= threshold;
}


// --- LOGIQUE DE JEU PRINCIPALE ---

function displayNewQuestion() {
    currentCountry = selectRandomCountry();

    // Mettre à jour les métriques pour le pays sélectionné
    currentCountry.views++;

    // Afficher le drapeau et le mettre à jour
    flagImage.src = currentCountry.flags.svg;
    flagImage.alt = currentCountry.name_en;

    // Réinitialiser l'interface
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
    const nameEn = currentCountry.name.common;
    // Gérer l'absence potentielle de traduction (fra.common peut être undefined)
    const nameFr = currentCountry.translations?.fra?.common || nameEn;

    if (checkCountryGuess(userGuess, nameEn, nameFr)) {
        // Bonne réponse
        score++;
        currentCountry.correct++;

        // Diminuer la probabilité (difficulté) pour ce pays (minimum 1)
        currentCountry.difficulty = Math.max(1, currentCountry.difficulty - DIFFICULTY_INCREMENT);

        messageArea.textContent = `Correct ! Le pays est ${nameFr} (${nameEn}).`;
        messageArea.className = 'message-success';
    } else {
        // Mauvaise réponse

        // Augmenter la probabilité (difficulté) pour ce pays (maximum MAX_DIFFICULTY)
        currentCountry.difficulty = Math.min(MAX_DIFFICULTY, currentCountry.difficulty + DIFFICULTY_INCREMENT);

        messageArea.textContent = `Faux. Le pays était ${nameFr} (${nameEn}). Essayez de le retenir !`;
        messageArea.className = 'message-error';
    }

    // Bloquer l'interaction et afficher le bouton Suivant
    guessInput.disabled = true;
    submitButton.disabled = true;
    nextButton.style.display = 'block';

    updateScoreboard();
}

// --- INITIALISATION ---
async function initGame() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erreur de chargement des données de pays');
        }

        const rawCountries = await response.json();

        // Charger les données de l'historique et initialiser 'countriesData'
        countriesData = loadGameData(rawCountries);

        // Attacher les événements
        submitButton.addEventListener('click', handleGuess);
        nextButton.addEventListener('click', displayNewQuestion);
        guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !submitButton.disabled) {
                handleGuess();
            }
        });

        resetButton.addEventListener('click', resetGame);

        // Démarrer le jeu
        displayNewQuestion();

    } catch (error) {
        console.error("Initialisation du jeu échouée:", error);
        messageArea.textContent = "Erreur: Impossible de charger les données du jeu. Vérifiez l'accès à l'API.";
        messageArea.className = 'message-error';
    }
}

initGame();