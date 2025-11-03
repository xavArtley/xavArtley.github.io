// Contenu de jaro-winkler.js

/**
 * Normalise une chaîne de caractères pour une comparaison robuste.
 */
function normalizeString(str) {
    if (typeof str !== 'string' || str.length === 0) return '';
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Calcule la similarité Jaro-Winkler entre deux chaînes (normalisées).
 */
function jaroWinklerSimilarity(s1, s2, p = 0.1, l = 4) {
    if (s1 === s2) return 1.0;

    // ... (Coller ici le corps complet de la fonction jaroWinklerSimilarity) ...
    // Note : Pour la concision ici, je ne mets que le commentaire, mais le code complet doit être là.

    // Code complet de Jaro-Winkler:
    const len1 = s1.length;
    const len2 = s2.length;

    if (len1 === 0 || len2 === 0) return 0.0;

    const match_range = Math.floor(Math.max(len1, len2) / 2) - 1;
    let matches = 0;
    const s1_matches = new Array(len1).fill(false);
    const s2_matches = new Array(len2).fill(false);

    for (let i = 0; i < len1; i++) {
        const start = Math.max(0, i - match_range);
        const end = Math.min(len2, i + match_range + 1);

        for (let j = start; j < end; j++) {
            if (!s2_matches[j] && s1[i] === s2[j]) {
                s1_matches[i] = true;
                s2_matches[j] = true;
                matches++;
                break;
            }
        }
    }

    if (matches === 0) return 0.0;

    let k = 0;
    let transpositions = 0;
    for (let i = 0; i < len1; i++) {
        if (s1_matches[i]) {
            while (!s2_matches[k]) k++;
            if (s1[i] !== s2[k]) {
                transpositions++;
            }
            k++;
        }
    }

    const m = matches;
    const t = transpositions / 2;
    const jaro = (m / len1 + m / len2 + (m - t) / m) / 3.0;

    let prefix = 0;
    for (let i = 0; i < Math.min(len1, len2, l); i++) {
        if (s1[i] === s2[i]) {
            prefix++;
        } else {
            break;
        }
    }

    return jaro + (prefix * p * (1.0 - jaro));
}

// NOTE: La fonction checkCountryGuess sera dans game.js