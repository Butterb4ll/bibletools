document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('mainNav');
    const searchField = document.querySelector('.search-field');
    const searchClear = document.querySelector('.search-clear');
    const searchButton = document.querySelector('.search-button');
    
    const bookSelect = document.getElementById('book');
    const chapterSelect = document.getElementById('chapter');
    const verseSelect = document.getElementById('verse');
    const goButton = document.getElementById('goButton');
    const verseInput = document.getElementById('verseInput');
    const searchVerseButton = document.getElementById('searchButton');
    const translationSelect = document.getElementById('translation');
    const prevChapterButton = document.getElementById('prevChapter');
    const nextChapterButton = document.getElementById('nextChapter');
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const modeLabel = document.getElementById('mode-label');
    const modeToggleContainer = document.querySelector('.mode-toggle-container');
    
    // Function to move dark mode toggle based on screen size
    function moveDarkModeToggle() {
        if (window.innerWidth <= 820) {
            // Move to nav menu if not already there
            if (modeToggleContainer && mainNav && !mainNav.contains(modeToggleContainer)) {
                // Insert after About link
                const aboutLink = mainNav.querySelector('a[href="/about"]');
                if (aboutLink) {
                    aboutLink.insertAdjacentElement('afterend', modeToggleContainer);
                } else {
                    mainNav.appendChild(modeToggleContainer);
                }
                modeToggleContainer.classList.add('in-mobile-menu');
            }
        } else {
            // Move back to header if not already there
            const headerContent = document.querySelector('.header-content > div[style*="display: flex"]');
            if (modeToggleContainer && headerContent && !headerContent.contains(modeToggleContainer)) {
                headerContent.appendChild(modeToggleContainer);
                modeToggleContainer.classList.remove('in-mobile-menu');
            }
        }
    }
    
    // Move toggle on load and resize
    moveDarkModeToggle();
    window.addEventListener('resize', moveDarkModeToggle);
    
    // Check for saved dark mode preference - AFTER moving the toggle
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
        modeLabel.textContent = 'Dark';
    } else {
        modeLabel.textContent = 'Light';
    }
    
    // Dark mode toggle event listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                modeLabel.textContent = 'Dark';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                modeLabel.textContent = 'Light';
                localStorage.setItem('darkMode', null);
            }
        });
    }
    
const bibleData = {
        // Old Testament 
        "genesis": { 
            name: "Genesis",
            chapters: {
                1: 31, 2: 25, 3: 24, 4: 26, 5: 32, 6: 22, 7: 24, 8: 22, 9: 29, 10: 32,
                11: 32, 12: 20, 13: 18, 14: 24, 15: 21, 16: 16, 17: 27, 18: 33, 19: 38, 20: 18,
                21: 34, 22: 24, 23: 20, 24: 67, 25: 34, 26: 35, 27: 46, 28: 22, 29: 35, 30: 43,
                31: 55, 32: 32, 33: 20, 34: 31, 35: 29, 36: 43, 37: 36, 38: 30, 39: 23, 40: 23,
                41: 57, 42: 38, 43: 34, 44: 34, 45: 28, 46: 34, 47: 31, 48: 22, 49: 33, 50: 26
            } 
        },
        "exodus": {
            name: "Exodus",
            chapters: {
                1: 22, 2: 25, 3: 22, 4: 31, 5: 23, 6: 30, 7: 25, 8: 32, 9: 35, 10: 29,
                11: 10, 12: 51, 13: 22, 14: 31, 15: 27, 16: 36, 17: 16, 18: 27, 19: 25, 20: 26,
                21: 36, 22: 31, 23: 33, 24: 18, 25: 40, 26: 37, 27: 21, 28: 43, 29: 46, 30: 38,
                31: 18, 32: 35, 33: 23, 34: 35, 35: 35, 36: 38, 37: 29, 38: 31, 39: 43, 40: 38
            }
        },
        "leviticus": {
            name: "Leviticus",
            chapters: {
                1: 17, 2: 16, 3: 17, 4: 35, 5: 19, 6: 30, 7: 38, 8: 36, 9: 24, 10: 20,
                11: 47, 12: 8, 13: 59, 14: 57, 15: 33, 16: 34, 17: 16, 18: 30, 19: 37, 20: 27,
                21: 24, 22: 33, 23: 44, 24: 23, 25: 55, 26: 46, 27: 34
            }
        },
        "numbers": {
            name: "Numbers",
            chapters: {
                1: 54, 2: 34, 3: 51, 4: 49, 5: 31, 6: 27, 7: 89, 8: 26, 9: 23, 10: 36,
                11: 35, 12: 16, 13: 33, 14: 45, 15: 41, 16: 50, 17: 13, 18: 32, 19: 22, 20: 29,
                21: 35, 22: 41, 23: 30, 24: 25, 25: 18, 26: 65, 27: 23, 28: 31, 29: 40, 30: 16,
                31: 54, 32: 42, 33: 56, 34: 29, 35: 34, 36: 13
            }
        },
        "deuteronomy": {
            name: "Deuteronomy",
            chapters: {
                1: 46, 2: 37, 3: 29, 4: 49, 5: 33, 6: 25, 7: 26, 8: 20, 9: 29, 10: 22,
                11: 32, 12: 32, 13: 18, 14: 29, 15: 23, 16: 22, 17: 20, 18: 22, 19: 21, 20: 20,
                21: 23, 22: 30, 23: 25, 24: 22, 25: 19, 26: 19, 27: 26, 28: 68, 29: 29, 30: 20,
                31: 30, 32: 52, 33: 29, 34: 12
            }
        },
        "joshua": {
            name: "Joshua",
            chapters: {
                1: 18, 2: 24, 3: 17, 4: 24, 5: 15, 6: 27, 7: 26, 8: 35, 9: 27, 10: 43,
                11: 23, 12: 24, 13: 33, 14: 15, 15: 63, 16: 10, 17: 18, 18: 28, 19: 51, 20: 9,
                21: 45, 22: 34, 23: 16, 24: 33
            }
        },
        "judges": {
            name: "Judges",
            chapters: {
                1: 36, 2: 23, 3: 31, 4: 24, 5: 31, 6: 40, 7: 25, 8: 35, 9: 57, 10: 18,
                11: 40, 12: 15, 13: 25, 14: 20, 15: 20, 16: 31, 17: 13, 18: 31, 19: 30, 20: 48,
                21: 25
            }
        },
        "ruth": {
            name: "Ruth",
            chapters: {
                1: 22, 2: 23, 3: 18, 4: 22
            }
        },
        "1-samuel": {
            name: "1 Samuel",
            chapters: {
                1: 28, 2: 36, 3: 21, 4: 22, 5: 12, 6: 21, 7: 17, 8: 22, 9: 27, 10: 27,
                11: 15, 12: 25, 13: 23, 14: 52, 15: 35, 16: 23, 17: 58, 18: 30, 19: 24, 20: 42,
                21: 15, 22: 23, 23: 29, 24: 22, 25: 44, 26: 25, 27: 12, 28: 25, 29: 11, 30: 31,
                31: 13
            }
        },
        "2-samuel": {
            name: "2 Samuel",
            chapters: {
                1: 27, 2: 32, 3: 39, 4: 12, 5: 25, 6: 23, 7: 29, 8: 18, 9: 13, 10: 19,
                11: 27, 12: 31, 13: 39, 14: 33, 15: 37, 16: 23, 17: 29, 18: 33, 19: 43, 20: 26,
                21: 22, 22: 51, 23: 39, 24: 25
            }
        },
        "1-kings": {
            name: "1 Kings",
            chapters: {
                1: 53, 2: 46, 3: 28, 4: 34, 5: 18, 6: 38, 7: 51, 8: 66, 9: 28, 10: 29,
                11: 43, 12: 33, 13: 34, 14: 31, 15: 34, 16: 34, 17: 24, 18: 46, 19: 21, 20: 43,
                21: 29, 22: 53
            }
        },
        "2-kings": {
            name: "2 Kings",
            chapters: {
                1: 18, 2: 25, 3: 27, 4: 44, 5: 27, 6: 33, 7: 20, 8: 29, 9: 37, 10: 36,
                11: 21, 12: 21, 13: 25, 14: 29, 15: 38, 16: 20, 17: 41, 18: 37, 19: 37, 20: 21,
                21: 26, 22: 20, 23: 37, 24: 20, 25: 30
            }
        },
        "1-chronicles": {
            name: "1 Chronicles",
            chapters: {
                1: 54, 2: 55, 3: 24, 4: 43, 5: 26, 6: 81, 7: 40, 8: 40, 9: 44, 10: 14,
                11: 47, 12: 40, 13: 14, 14: 17, 15: 29, 16: 43, 17: 27, 18: 17, 19: 19, 20: 8,
                21: 30, 22: 19, 23: 32, 24: 31, 25: 31, 26: 32, 27: 34, 28: 21, 29: 30
            }
        },
        "2-chronicles": {
            name: "2 Chronicles",
            chapters: {
                1: 17, 2: 18, 3: 17, 4: 22, 5: 14, 6: 42, 7: 22, 8: 18, 9: 31, 10: 19,
                11: 23, 12: 16, 13: 22, 14: 15, 15: 19, 16: 14, 17: 19, 18: 34, 19: 11, 20: 37,
                21: 20, 22: 12, 23: 21, 24: 27, 25: 28, 26: 23, 27: 9, 28: 27, 29: 36, 30: 27,
                31: 21, 32: 33, 33: 25, 34: 33, 35: 27, 36: 23
            }
        },
        "ezra": {
            name: "Ezra",
            chapters: {
                1: 11, 2: 70, 3: 13, 4: 24, 5: 17, 6: 22, 7: 28, 8: 36, 9: 15, 10: 44
            }
        },
        "nehemiah": {
            name: "Nehemiah",
            chapters: {
                1: 11, 2: 20, 3: 32, 4: 23, 5: 19, 6: 19, 7: 73, 8: 18, 9: 38, 10: 39,
                11: 36, 12: 47, 13: 31
            }
        },
        "esther": {
            name: "Esther",
            chapters: {
                1: 22, 2: 23, 3: 15, 4: 17, 5: 14, 6: 14, 7: 10, 8: 17, 9: 32, 10: 3
            }
        },
        "job": {
            name: "Job",
            chapters: {
                1: 22, 2: 13, 3: 26, 4: 21, 5: 27, 6: 30, 7: 21, 8: 22, 9: 35, 10: 22,
                11: 20, 12: 25, 13: 28, 14: 22, 15: 35, 16: 22, 17: 16, 18: 21, 19: 29, 20: 29,
                21: 34, 22: 30, 23: 17, 24: 25, 25: 6, 26: 14, 27: 23, 28: 28, 29: 25, 30: 31,
                31: 40, 32: 22, 33: 33, 34: 37, 35: 16, 36: 33, 37: 24, 38: 41, 39: 30, 40: 24,
                41: 34, 42: 17
            }
        },
        "psalms": {
            name: "Psalms",
            chapters: {
                1: 6, 2: 12, 3: 8, 4: 8, 5: 12, 6: 10, 7: 17, 8: 9, 9: 20, 10: 18,
                11: 7, 12: 8, 13: 6, 14: 7, 15: 5, 16: 11, 17: 15, 18: 50, 19: 14, 20: 9,
                21: 13, 22: 31, 23: 6, 24: 10, 25: 22, 26: 12, 27: 14, 28: 9, 29: 11, 30: 12,
                31: 24, 32: 11, 33: 22, 34: 22, 35: 28, 36: 12, 37: 40, 38: 22, 39: 13, 40: 17,
                41: 13, 42: 11, 43: 5, 44: 26, 45: 17, 46: 11, 47: 9, 48: 14, 49: 20, 50: 23,
                51: 19, 52: 9, 53: 6, 54: 7, 55: 23, 56: 13, 57: 11, 58: 11, 59: 17, 60: 12,
                61: 8, 62: 12, 63: 11, 64: 10, 65: 13, 66: 20, 67: 7, 68: 35, 69: 36, 70: 5,
                71: 24, 72: 20, 73: 28, 74: 23, 75: 10, 76: 12, 77: 20, 78: 72, 79: 13, 80: 19,
                81: 16, 82: 8, 83: 18, 84: 12, 85: 13, 86: 17, 87: 7, 88: 18, 89: 52, 90: 17,
                91: 16, 92: 15, 93: 5, 94: 23, 95: 11, 96: 13, 97: 12, 98: 9, 99: 9, 100: 5,
                101: 8, 102: 28, 103: 22, 104: 35, 105: 45, 106: 48, 107: 43, 108: 13, 109: 31, 110: 7,
                111: 10, 112: 10, 113: 9, 114: 8, 115: 18, 116: 19, 117: 2, 118: 29, 119: 176, 120: 7,
                121: 8, 122: 9, 123: 4, 124: 8, 125: 5, 126: 6, 127: 5, 128: 6, 129: 8, 130: 8,
                131: 3, 132: 18, 133: 3, 134: 3, 135: 21, 136: 26, 137: 9, 138: 8, 139: 24, 140: 13,
                141: 10, 142: 7, 143: 12, 144: 15, 145: 21, 146: 10, 147: 20, 148: 14, 149: 9, 150: 6
            }
        },
        "proverbs": {
            name: "Proverbs",
            chapters: {
                1: 33, 2: 22, 3: 35, 4: 27, 5: 23, 6: 35, 7: 27, 8: 36, 9: 18, 10: 32,
                11: 31, 12: 28, 13: 25, 14: 35, 15: 33, 16: 33, 17: 28, 18: 24, 19: 29, 20: 30,
                21: 31, 22: 29, 23: 35, 24: 34, 25: 28, 26: 28, 27: 27, 28: 28, 29: 27, 30: 33,
                31: 31
            }
        },
        "ecclesiastes": {
            name: "Ecclesiastes",
            chapters: {
                1: 18, 2: 26, 3: 22, 4: 16, 5: 20, 6: 12, 7: 29, 8: 17, 9: 18, 10: 20,
                11: 10, 12: 14
            }
        },
        "song of solomon": {
            name: "Song of Solomon",
            chapters: {
                1: 17, 2: 17, 3: 11, 4: 16, 5: 16, 6: 13, 7: 13, 8: 14
            }
        },
        "isaiah": {
            name: "Isaiah",
            chapters: {
                1: 31, 2: 22, 3: 26, 4: 6, 5: 30, 6: 13, 7: 25, 8: 22, 9: 21, 10: 34,
                11: 16, 12: 6, 13: 22, 14: 32, 15: 9, 16: 14, 17: 14, 18: 7, 19: 25, 20: 6,
                21: 17, 22: 25, 23: 18, 24: 23, 25: 12, 26: 21, 27: 13, 28: 29, 29: 24, 30: 33,
                31: 9, 32: 20, 33: 24, 34: 17, 35: 10, 36: 22, 37: 38, 38: 22, 39: 8, 40: 31,
                41: 29, 42: 25, 43: 28, 44: 28, 45: 25, 46: 13, 47: 15, 48: 22, 49: 26, 50: 11,
                51: 23, 52: 15, 53: 12, 54: 17, 55: 13, 56: 12, 57: 21, 58: 14, 59: 21, 60: 22,
                61: 11, 62: 12, 63: 19, 64: 12, 65: 25, 66: 24
            }
        },
        "jeremiah": {
            name: "Jeremiah",
            chapters: {
                1: 19, 2: 37, 3: 25, 4: 31, 5: 31, 6: 30, 7: 34, 8: 22, 9: 26, 10: 25,
                11: 23, 12: 17, 13: 27, 14: 22, 15: 21, 16: 21, 17: 27, 18: 23, 19: 15, 20: 18,
                21: 14, 22: 30, 23: 40, 24: 10, 25: 38, 26: 24, 27: 22, 28: 17, 29: 32, 30: 24,
                31: 40, 32: 44, 33: 26, 34: 22, 35: 19, 36: 32, 37: 21, 38: 28, 39: 18, 40: 16,
                41: 18, 42: 22, 43: 13, 44: 30, 45: 5, 46: 28, 47: 7, 48: 47, 49: 39, 50: 46,
                51: 64, 52: 34
            }
        },
        "lamentations": {
            name: "Lamentations",
            chapters: {
                1: 22, 2: 22, 3: 66, 4: 22, 5: 22
            }
        },
        "ezekiel": {
            name: "Ezekiel",
            chapters: {
                1: 28, 2: 10, 3: 27, 4: 17, 5: 17, 6: 14, 7: 27, 8: 18, 9: 11, 10: 22,
                11: 25, 12: 28, 13: 23, 14: 23, 15: 8, 16: 63, 17: 24, 18: 32, 19: 14, 20: 49,
                21: 32, 22: 31, 23: 49, 24: 27, 25: 17, 26: 21, 27: 36, 28: 26, 29: 21, 30: 26,
                31: 18, 32: 32, 33: 33, 34: 31, 35: 15, 36: 38, 37: 28, 38: 23, 39: 29, 40: 49,
                41: 26, 42: 20, 43: 27, 44: 31, 45: 25, 46: 24, 47: 23, 48: 35
            }
        },
        "daniel": {
            name: "Daniel",
            chapters: {
                1: 21, 2: 49, 3: 30, 4: 37, 5: 31, 6: 28, 7: 28, 8: 27, 9: 27, 10: 21,
                11: 45, 12: 13
            }
        },
        "hosea": {
            name: "Hosea",
            chapters: {
                1: 11, 2: 23, 3: 5, 4: 19, 5: 15, 6: 11, 7: 16, 8: 14, 9: 17, 10: 15,
                11: 12, 12: 14, 13: 16, 14: 9
            }
        },
        "joel": {
            name: "Joel",
            chapters: {
                1: 20, 2: 32, 3: 21
            }
        },
        "amos": {
            name: "Amos",
            chapters: {
                1: 15, 2: 16, 3: 15, 4: 13, 5: 27, 6: 14, 7: 17, 8: 14, 9: 15
            }
        },
        "obadiah": {
            name: "Obadiah",
            chapters: {
                1: 21
            }
        },
        "jonah": {
            name: "Jonah",
            chapters: {
                1: 17, 2: 10, 3: 10, 4: 11
            }
        },
        "micah": {
            name: "Micah",
            chapters: {
                1: 16, 2: 13, 3: 12, 4: 13, 5: 15, 6: 16, 7: 20
            }
        },
        "nahum": {
            name: "Nahum",
            chapters: {
                1: 15, 2: 13, 3: 19
            }
        },
        "habakkuk": {
            name: "Habakkuk",
            chapters: {
                1: 17, 2: 20, 3: 19
            }
        },
        "zephaniah": {
            name: "Zephaniah",
            chapters: {
                1: 18, 2: 15, 3: 20
            }
        },
        "haggai": {
            name: "Haggai",
            chapters: {
                1: 15, 2: 23
            }
        },
        "zechariah": {
            name: "Zechariah",
            chapters: {
                1: 21, 2: 13, 3: 10, 4: 14, 5: 11, 6: 15, 7: 14, 8: 23, 9: 17, 10: 12,
                11: 17, 12: 14, 13: 9, 14: 21
            }
        },
        "malachi": {
            name: "Malachi",
            chapters: {
                1: 14, 2: 17, 3: 18, 4: 6
            }
        },
        
        // New Testament
        "matthew": {
            name: "Matthew",
            chapters: {
                1: 25, 2: 23, 3: 17, 4: 25, 5: 48, 6: 34, 7: 29, 8: 34, 9: 38, 10: 42,
                11: 30, 12: 50, 13: 58, 14: 36, 15: 39, 16: 28, 17: 27, 18: 35, 19: 30, 20: 34,
                21: 46, 22: 46, 23: 39, 24: 51, 25: 46, 26: 75, 27: 66, 28: 20
            }
        },
        "mark": {
            name: "Mark",
            chapters: {
                1: 45, 2: 28, 3: 35, 4: 41, 5: 43, 6: 56, 7: 37, 8: 38, 9: 50, 10: 52,
                11: 33, 12: 44, 13: 37, 14: 72, 15: 47, 16: 20
            }
        },
        "luke": {
            name: "Luke",
            chapters: {
                1: 80, 2: 52, 3: 38, 4: 44, 5: 39, 6: 49, 7: 50, 8: 56, 9: 62, 10: 42,
                11: 54, 12: 59, 13: 35, 14: 35, 15: 32, 16: 31, 17: 37, 18: 43, 19: 48, 20: 47,
                21: 38, 22: 71, 23: 56, 24: 53
            }
        },
        "john": {
            name: "John",
            chapters: {
                1: 51, 2: 25, 3: 36, 4: 54, 5: 47, 6: 71, 7: 53, 8: 59, 9: 41, 10: 42,
                11: 57, 12: 50, 13: 38, 14: 31, 15: 27, 16: 33, 17: 26, 18: 40, 19: 42, 20: 31,
                21: 25
            }
        },
        "acts": {
            name: "Acts",
            chapters: {
                1: 26, 2: 47, 3: 26, 4: 37, 5: 42, 6: 15, 7: 60, 8: 40, 9: 43, 10: 48,
                11: 30, 12: 25, 13: 52, 14: 28, 15: 41, 16: 40, 17: 34, 18: 28, 19: 41, 20: 38,
                21: 40, 22: 30, 23: 35, 24: 27, 25: 27, 26: 32, 27: 44, 28: 31
            }
        },
        "romans": {
            name: "Romans",
            chapters: {
                1: 32, 2: 29, 3: 31, 4: 25, 5: 21, 6: 23, 7: 25, 8: 39, 9: 33, 10: 21,
                11: 36, 12: 21, 13: 14, 14: 23, 15: 33, 16: 27
            }
        },
        "1-corinthians": {
            name: "1 Corinthians",
            chapters: {
                1: 31, 2: 16, 3: 23, 4: 21, 5: 13, 6: 20, 7: 40, 8: 13, 9: 27, 10: 33,
                11: 34, 12: 31, 13: 13, 14: 40, 15: 58, 16: 24
            }
        },
        "2-corinthians": {
            name: "2 Corinthians",
            chapters: {
                1: 24, 2: 17, 3: 18, 4: 18, 5: 21, 6: 18, 7: 16, 8: 24, 9: 15, 10: 18,
                11: 33, 12: 21, 13: 14
            }
        },
        "galatians": {
            name: "Galatians",
            chapters: {
                1: 24, 2: 21, 3: 29, 4: 31, 5: 26, 6: 18
            }
        },
        "ephesians": {
            name: "Ephesians",
            chapters: {
                1: 23, 2: 22, 3: 21, 4: 32, 5: 33, 6: 24
            }
        },
        "philippians": {
            name: "Philippians",
            chapters: {
                1: 30, 2: 30, 3: 21, 4: 23
            }
        },
        "colossians": {
            name: "Colossians",
            chapters: {
                1: 29, 2: 23, 3: 25, 4: 18
            }
        },
        "1-thessalonians": {
            name: "1 Thessalonians",
            chapters: {
                1: 10, 2: 20, 3: 13, 4: 18, 5: 28
            }
        },
        "2-thessalonians": {
            name: "2 Thessalonians",
            chapters: {
                1: 12, 2: 17, 3: 18
            }
        },
        "1-timothy": {
            name: "1 Timothy",
            chapters: {
                1: 20, 2: 15, 3: 16, 4: 16, 5: 25, 6: 21
            }
        },
        "2-timothy": {
            name: "2 Timothy",
            chapters: {
                1: 18, 2: 26, 3: 17, 4: 22
            }
        },
        "titus": {
            name: "Titus",
            chapters: {
                1: 16, 2: 15, 3: 15
            }
        },
        "philemon": {
            name: "Philemon",
            chapters: {
                1: 25
            }
        },
        "hebrews": {
            name: "Hebrews",
            chapters: {
                1: 14, 2: 18, 3: 19, 4: 16, 5: 14, 6: 20, 7: 28, 8: 13, 9: 28, 10: 39,
                11: 40, 12: 29, 13: 25
            }
        },
        "james": {
            name: "James",
            chapters: {
                1: 27, 2: 26, 3: 18, 4: 17, 5: 20
            }
        },
        "1-peter": {
            name: "1 Peter",
            chapters: {
                1: 25, 2: 25, 3: 22, 4: 19, 5: 14
            }
        },
        "2-peter": {
            name: "2 Peter",
            chapters: {
                1: 21, 2: 22, 3: 18
            }
        },
        "1-john": {
            name: "1 John",
            chapters: {
                1: 10, 2: 29, 3: 24, 4: 21, 5: 21
            }
        },
        "2-john": {
            name: "2 John",
            chapters: {
                1: 13
            }
        },
        "3-john": {
            name: "3 John",
            chapters: {
                1: 14
            }
        },
        "jude": {
            name: "Jude",
            chapters: {
                1: 25
            }
        },
        "revelation": {
            name: "Revelation",
            chapters: {
                1: 20, 2: 29, 3: 22, 4: 11, 5: 14, 6: 17, 7: 17, 8: 13, 9: 21, 10: 11,
                11: 19, 12: 17, 13: 18, 14: 20, 15: 8, 16: 21, 17: 18, 18: 24, 19: 21, 20: 15,
                21: 27, 22: 21
            }
        }
    };

    // Book abbreviations for parsing references
const bookAbbreviations = {
    'gen': 'genesis', 'genesis': 'genesis', 'gn': 'genesis', 'ge': 'genesis', 'gene': 'genesis', 'ges': 'genesis', 'gens': 'genesis',
    'ex': 'exodus', 'exo': 'exodus', 'exod': 'exodus', 'exodus': 'exodus', 'exods': 'exodus',
    'lev': 'leviticus', 'leviticus': 'leviticus', 'lv': 'leviticus', 'le': 'leviticus', 'levi': 'leviticus', 'levit': 'leviticus',
    'num': 'numbers', 'nums': 'numbers', 'numbers': 'numbers', 'nm': 'numbers', 'nu': 'numbers', 'numb': 'numbers',
    'deut': 'deuteronomy', 'deuteronomy': 'deuteronomy', 'dt': 'deuteronomy', 'deu': 'deuteronomy', 'deutero': 'deuteronomy', 'deuter': 'deuteronomy', 'deutern': 'deuteronomy',
    'josh': 'joshua', 'joshua': 'joshua', 'jos': 'joshua', 'js': 'joshua', 'jsh': 'joshua',
    'judg': 'judges', 'judges': 'judges', 'jdg': 'judges', 'jg': 'judges', 'jdgs': 'judges', 'judgess': 'judges',
    'ruth': 'ruth', 'ru': 'ruth',
    '1sam': '1-samuel', '1 sam': '1-samuel', '1 samuel': '1-samuel', 'i sam': '1-samuel', 'i samuel': '1-samuel', '1s': '1-samuel', '1samu': '1-samuel', '1samue': '1-samuel', '1samuel': '1-samuel',
    '2sam': '2-samuel', '2 sam': '2-samuel', '2 samuel': '2-samuel', 'ii sam': '2-samuel', 'ii samuel': '2-samuel', '2s': '2-samuel', '2samu': '2-samuel', '2samue': '2-samuel', '2samuel': '2-samuel',
    '1kgs': '1-kings', '1kings': '1-kings', '1 king': '1-kings', 'i kgs': '1-kings', 'i kings': '1-kings', '1k': '1-kings', '1ki': '1-kings', '1kin': '1-kings', '1king': '1-kings',
    '2kgs': '2-kings', '2kings': '2-kings', '2 king': '2-kings', 'ii kgs': '2-kings', 'ii kings': '2-kings', '2k': '2-kings', '2ki': '2-kings', '2kin': '2-kings', '2king': '2-kings',
    '1chron': '1-chronicles', '1 chron': '1-chronicles', '1 chronicles': '1-chronicles', 'i chron': '1-chronicles', 'i chronicles': '1-chronicles', '1c': '1-chronicles', '1ch': '1-chronicles', '1chr': '1-chronicles', '1chro': '1-chronicles', '1chron': '1-chronicles', '1 cron': '1-chronicles',
    '2chron': '2-chronicles', '2 chron': '2-chronicles', '2 chronicles': '2-chronicles', 'ii chron': '2-chronicles', 'ii chronicles': '2-chronicles', '2c': '2-chronicles', '2ch': '2-chronicles', '2chr': '2-chronicles', '2chro': '2-chronicles', '2chron': '2-chronicles', '2 cron': '2-chronicles',
    'ezra': 'ezra', 'ezr': 'ezra',
    'neh': 'nehemiah', 'nehemiah': 'nehemiah', 'ne': 'nehemiah', 'nehm': 'nehemiah', 'nehe': 'nehemiah',
    'esth': 'esther', 'esther': 'esther', 'est': 'esther',
    'job': 'job', 'jb': 'job',
    'ps': 'psalms', 'psa': 'psalms', 'psalm': 'psalms', 'psalms': 'psalms', 'psm': 'psalms', 'pss': 'psalms', 'pslm': 'psalms', 'psalme': 'psalms', 'psms': 'psalms', 'pslms': 'psalms',
    'prov': 'proverbs', 'proverbs': 'proverbs', 'prv': 'proverbs', 'pr': 'proverbs', 'pro': 'proverbs', 'prover': 'proverbs', 'proverb': 'proverbs',
    'eccl': 'ecclesiastes', 'ecclesiastes': 'ecclesiastes', 'qohelet': 'ecclesiastes', 'ecc': 'ecclesiastes', 'eccle': 'ecclesiastes', 'eccles': 'ecclesiastes',
    'song': 'song-of-solomon', 'songs': 'song-of-solomon', 'sos': 'song-of-solomon', 'canticles': 'song-of-solomon', 'song of solomon': 'song-of-solomon',
    'isa': 'isaiah', 'isaiah': 'isaiah', 'is': 'isaiah', 'ias': 'isaiah', 'isai': 'isaiah', 'isaih': 'isaiah', 'isaias': 'isaiah',
    'jer': 'jeremiah', 'jeremiah': 'jeremiah', 'je': 'jeremiah', 'jr': 'jeremiah', 'jere': 'jeremiah',
    'lam': 'lamentations', 'lamentations': 'lamentations', 'la': 'lamentations', 'lamen': 'lamentations',
    'ezek': 'ezekiel', 'ezekiel': 'ezekiel', 'ez': 'ezekiel', 'eze': 'ezekiel', 'ezeq': 'ezekiel',
    'dan': 'daniel', 'daniel': 'daniel', 'dn': 'daniel', 'dn': 'daniel', 'danl': 'daniel',
    'hos': 'hosea', 'hosea': 'hosea',
    'joel': 'joel', 'jl': 'joel',
    'amos': 'amos', 'am': 'amos',
    'obad': 'obadiah', 'obadiah': 'obadiah', 'ob': 'obadiah',
    'jonah': 'jonah', 'jon': 'jonah',
    'mic': 'micah', 'micah': 'micah',
    'nah': 'nahum', 'nahum': 'nahum',
    'hab': 'habakkuk', 'habakkuk': 'habakkuk', 'hb': 'habakkuk',
    'zeph': 'zephaniah', 'zephaniah': 'zephaniah', 'zp': 'zephaniah', 'zep': 'zephaniah', 'zephn': 'zephaniah', 'zepn': 'zephaniah',
    'hag': 'haggai', 'haggai': 'haggai', 'hg': 'haggai', 'hagga': 'haggai', 'hagg': 'haggai', 'haggg': 'haggai',
    'zech': 'zechariah', 'zechariah': 'zechariah', 'zc': 'zechariah', 'zechr': 'zechariah',
    'mal': 'malachi', 'malachi': 'malachi', 'ml': 'malachi', 'malach': 'malachi',
    'matt': 'matthew', 'matthew': 'matthew', 'mt': 'matthew', 'mat': 'matthew', 'matth': 'matthew', 'math': 'matthew', 'mathew': 'matthew', 'mathe': 'matthew', 'mathew': 'matthew', 'mathhews': 'matthew',
    'mark': 'mark', 'mk': 'mark', 'mrk': 'mark', 'mar': 'mark', 'marc': 'mark', 'marck': 'mark', 'marks': 'mark', 'marcs': 'mark', 'marcks': 'mark',
    'luke': 'luke', 'lk': 'luke', 'luk': 'luke', 'lu': 'luke', 'lukes': 'luke', 'luks': 'luke', 'lukes': 'luke',
    'john': 'john', 'jn': 'john', 'joh': 'john', 'jhn': 'john', 'johm': 'john', 'johne': 'john', 'johns': 'john',
    'acts': 'acts', 'act': 'acts', 'ac': 'acts', 
    'rom': 'romans', 'romans': 'romans', 'rm': 'romans', 'ro': 'romans', 'roma': 'romans', 'roman': 'romans', 'romas': 'romans',
    '1cor': '1-corinthians', '1 cor': '1-corinthians', '1 corinthians': '1-corinthians', 'i cor': '1-corinthians', 'i corinthians': '1-corinthians', '1c': '1-corinthians', '1co': '1-corinthians', '1corin': '1-corinthians', '1corinth': '1-corinthians', '1corintha': '1-corinthians', '1corinthia': '1-corinthians', '1corinthian': '1-corinthians',
    '2cor': '2-corinthians', '2 cor': '2-corinthians', '2 corinthians': '2-corinthians', 'ii cor': '2-corinthians', 'ii corinthians': '2-corinthians', '2c': '2-corinthians', '2co': '2-corinthians', '2corin': '2-corinthians', '2corinth': '2-corinthians', '2corintha': '2-corinthians', '2corinthia': '2-corinthians', '2corinthian': '2-corinthians',
    'gal': 'galatians', 'galatians': 'galatians', 'ga': 'galatians', 'gala': 'galatians', 'galat': 'galatians', 'galati': 'galatians', 'galatia': 'galatians', 'galatian': 'galatians',
    'eph': 'ephesians', 'ephesians': 'ephesians', 'ep': 'ephesians', 'epha': 'ephesians', 'ephesi': 'ephesians', 'ephesia': 'ephesians', 'ephesian': 'ephesians',
    'phil': 'philippians', 'philippians': 'philippians', 'php': 'philippians', 'phili': 'philippians', 'philip': 'philippians', 'philipp': 'philippians', 'philippi': 'philippians', 'philippia': 'philippians', 'philippian': 'philippians',
    'col': 'colossians', 'collossians': 'colossians', 'colos': 'colossians', 'coloss': 'colossians', 'colossi': 'colossians', 'colossia': 'colossians', 'colossian': 'colossians',
    '1thess': '1-thessalonians', '1 thess': '1-thessalonians', '1 thessalonians': '1-thessalonians', 'i thess': '1-thessalonians', 'i thessalonians': '1-thessalonians', '1thes': '1-thessalonians', '1thesa': '1-thessalonians', '1thesan': '1-thessalonians', '1thessa': '1-thessalonians', '1thessal': '1-thessalonians', '1thessalo': '1-thessalonians', '1thessalon': '1-thessalonians', '1thessaloni': '1-thessalonians', '1thessalonii': '1-thessalonians', '1thessalonian': '1-thessalonians', '1th': '1-thessalonians', '1 thes': '1-thessalonians',
    '2thess': '2-thessalonians', '2 thess': '2-thessalonians', '2 thessalonians': '2-thessalonians', 'ii thess': '2-thessalonians', 'ii thessalonians': '2-thessalonians', '2thes': '2-thessalonians', '2thesa': '2-thessalonians', '2thesan': '2-thessalonians', '2thessa': '2-thessalonians', '2th': '2-thessalonians', '2thessal': '2-thessalonians', '2thessalo': '2-thessalonians', '2 thes': '2-thessalonians',
    '1tim': '1-timothy', '1 tim': '1-timothy', '1 timothy': '1-timothy', 'i tim': '1-timothy', 'i timothy': '1-timothy', '1tim': '1-timothy', '1ti': '1-timothy', '1timot': '1-timothy', '1timoth': '1-timothy', '1timothy': '1-timothy',
    '2tim': '2-timothy', '2 tim': '2-timothy', '2 timothy': '2-timothy', 'ii tim': '2-timothy', 'ii timothy': '2-timothy', '2ti': '2-timothy', '2timot': '2-timothy', '2timoth': '2-timothy', '2timothy': '2-timothy', '2tim': '2-timothy',
    'tit': 'titus', 'titus': 'titus', 'ti': 'titus', 'titu': 'titus', 
    'philem': 'philemon', 'philemon': 'philemon', 'phm': 'philemon', 'phile': 'philemon',
    'heb': 'hebrews', 'he': 'hebrews', 'hebrews': 'hebrews', 'hebs': 'hebrews', 'hew': 'hebrews', 'hebr': 'hebrews', 'hebre': 'hebrews',
    'jas': 'james', 'jam': 'james', 'james': 'james', 'jm': 'james', 'jame': 'james',
    '1pet': '1-peter', '1 pet': '1-peter', '1 peter': '1-peter', 'i pet': '1-peter', 'i peter': '1-peter', '1p': '1-peter', 
    '2pet': '2-peter', '2 pet': '2-peter', '2 peter': '2-peter', 'ii pet': '2-peter', 'ii peter': '2-peter', '2p': '2-peter',
    '1john': '1-john', '1 john': '1-john', 'i john': '1-john', 
    '2john': '2-john', '2 john': '2-john', 'ii john': '2-john',
    '3john': '3-john', '3 john': '3-john', 'iii john': '3-john', 
    'jude': 'jude', 'jud': 'jude', 'ju': 'jude',
    'rev': 'revelation', 'revelation': 'revelation', 'rv': 'revelation', 'reve': 'revelation'
};
    const globalVerseState = {
        book: 'genesis',
        chapter: 1,
        verse: 1,
        
        // Update the global state
        update: function(book, chapter, verse) {
            this.book = book;
            this.chapter = parseInt(chapter);
            this.verse = parseInt(verse);
            
            // Trigger all dependent updates
            this.notifyStateChange();
        },
        
        // Notify all components that state has changed
        notifyStateChange: function() {
            updateComparisonPanel();
            updateStudyPanelIfOpen();
        },
        
        // Get current reference as string
        getReferenceString: function() {
            const bookName = bibleData[this.book] ? bibleData[this.book].name : this.book;
            return `${bookName} ${this.chapter}:${this.verse}`;
        }
    };


    // Create menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Header scroll behavior
    let lastScrollPosition = 0;
    window.addEventListener('scroll', function() {
        // Only apply scroll behavior on screens larger than 1050px
        if (window.innerWidth <= 1050) {
            header.classList.remove('scrolled');
            return;
        }

        const currentScrollPosition = window.pageYOffset;
        const scrollThreshold = 60;

        if (currentScrollPosition > scrollThreshold && currentScrollPosition > lastScrollPosition) {
            header.classList.add('scrolled');
        } else if (currentScrollPosition < lastScrollPosition || currentScrollPosition < scrollThreshold) {
            header.classList.remove('scrolled');
        }

        lastScrollPosition = currentScrollPosition;
    });

    // Remove scrolled class on resize if window is <= 1050px
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 1050) {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = isExpanded ? 'hidden' : '';
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close mobile menu
    overlay.addEventListener('click', closeMobileMenu);
    
    function closeMobileMenu() {
        if (navToggle) {
            navToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Search functionality
    if (searchField && searchClear) {
        searchField.addEventListener('input', function() {
            const hasValue = searchField.value.length > 0;
            searchClear.style.display = hasValue ? 'block' : 'none';
        });
        
        searchClear.addEventListener('click', function() {
            searchField.value = '';
            searchClear.style.display = 'none';
            searchField.focus();
        });
    }
    
    // Update chapters when book changes
    if (bookSelect) {
        bookSelect.addEventListener('change', function() {
            updateChapters();
        });
    }
    
    // Update verses when chapter changes
    if (chapterSelect) {
        chapterSelect.addEventListener('change', function() {
            updateVerses();
        });
    }
    
    // Go button functionality
    if (goButton) {
        goButton.addEventListener('click', function() {
            const book = bookSelect.value;
            const chapter = parseInt(chapterSelect.value);
            const verse = parseInt(verseSelect.value);
            
            navigateToVerse(book, chapter, verse);
        });
    }
    
    // Direct verse input
    if (searchVerseButton && verseInput) {
        searchVerseButton.addEventListener('click', function() {
            const reference = verseInput.value.trim();
            if (reference) {
                parseAndNavigateToReference(reference);
            }
        });
        
        verseInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const reference = verseInput.value.trim();
                if (reference) {
                    parseAndNavigateToReference(reference);
                }
            }
        });
    }
    
    // Chapter navigation
    if (prevChapterButton) {
        prevChapterButton.addEventListener('click', function() {
            navigateToPreviousChapter();
        });
    }
    
    if (nextChapterButton) {
        nextChapterButton.addEventListener('click', function() {
            navigateToNextChapter();
        });
    }
    
    // Translation change handler
    if (translationSelect) {
        translationSelect.addEventListener('change', function() {
            updateVerseTexts();
            updateComparisonPanel(); // Update comparison with new translation
        });
    }
    
    // Update chapter dropdown
    function updateChapters() {
        const bookValue = bookSelect.value;
        chapterSelect.innerHTML = '';
        
        if (bibleData[bookValue]) {
            const numChapters = Object.keys(bibleData[bookValue].chapters).length;
            
            for (let i = 1; i <= numChapters; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                chapterSelect.appendChild(option);
            }
        }
        
        updateVerses();
    }
    
    // Update verse dropdown
    function updateVerses() {
        const bookValue = bookSelect.value;
        const chapter = parseInt(chapterSelect.value);
        
        verseSelect.innerHTML = '';
        
        if (bibleData[bookValue] && bibleData[bookValue].chapters[chapter]) {
            const verseCount = bibleData[bookValue].chapters[chapter];
            
            for (let i = 1; i <= verseCount; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                verseSelect.appendChild(option);
            }
        }
    }
    
function navigateToVerse(book, chapter, verse) {
    console.log('navigateToVerse called with:', book, chapter, verse); // Debug
    // Reset verse search input
    const verseInput = document.getElementById('verseInput');
    if (verseInput) {
        verseInput.value = '';
    }
    
    // Update global state FIRST
    globalVerseState.update(book, chapter, verse);
    
    // Update UI elements
    const bookName = bibleData[book] ? bibleData[book].name : book;
    document.getElementById('passage-title').textContent = `${bookName} ${chapter}:${verse}`;

    // Load the chapter content
    loadChapterContent(book, chapter);

    // Highlight the correct verse
    setTimeout(() => {
        document.querySelectorAll('.verse').forEach(v => v.classList.remove('highlighted'));
        const targetVerse = document.getElementById(`verse-${verse}`);
        if (targetVerse) {
            targetVerse.classList.add('highlighted');

            // Smooth scroll to the verse
            targetVerse.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Automatically open Forerunner commentary
            setTimeout(() => {
                openStudyPanel('forerunner', {
                    book: book,
                    chapter: chapter,
                    verse: verse
                });

                // Reset dropdowns to Genesis 1:1 AFTER everything is loaded
                setTimeout(() => {
                    bookSelect.value = 'genesis';
                    updateChapters();
                    chapterSelect.value = '1';
                    updateVerses();
                    verseSelect.value = '1';
                }, 100);
            }, 200);
        }
    }, 100);
}
    
    // Load chapter content dynamically
    function loadChapterContent(book, chapter) {
        const versesContainer = document.getElementById('versesContainer');
        if (!versesContainer) return;
        
        versesContainer.innerHTML = '';
        
        const verseCount = bibleData[book].chapters[chapter];
        const translation = translationSelect.value;
        
        for (let i = 1; i <= verseCount; i++) {
            const verseElement = createVerseElement(i, book, chapter, translation);
            versesContainer.appendChild(verseElement);
        }
        
        // Setup verse interactions after creating verses
        setupVerseInteractions();
    }
    
    function createVerseElement(verseNumber, book, chapter, translation) {
        const verse = document.createElement('div');
        verse.className = 'verse';
        verse.id = `verse-${verseNumber}`;
        verse.dataset.verse = verseNumber;
        
        // Create verse content
        const verseContent = document.createElement('div');
        verseContent.className = 'verse-content';
        
        const verseNum = document.createElement('div');
        verseNum.className = 'verse-number';
        verseNum.textContent = verseNumber;
        
        const verseText = document.createElement('div');
        verseText.className = 'verse-text';
        verseText.textContent = getVerseText(book, chapter, verseNumber, translation);
        
        verseContent.appendChild(verseNum);
        verseContent.appendChild(verseText);
        verse.appendChild(verseContent);

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.setAttribute('aria-label', 'Copy verse');
        copyButton.innerHTML = `
            <span class="copy-icon">
                <svg class="copy-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                </svg>
                <svg class="check-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            </span>
        `;

        verse.appendChild(copyButton);

        // Add verse tools
        const verseTools = document.createElement('div');
        verseTools.className = 'verse-tools';
        
        // Desktop verse options
        const verseOptions = document.createElement('div');
        verseOptions.className = 'verse-options';
        
        const options = [
            { name: 'Definitions', type: 'definitions' },
            { name: 'Interlinear', type: 'interlinear' },
            { name: 'Library', type: 'library' },
            { name: 'Topical', type: 'topical' },
            { name: 'Cross Refs', type: 'cross-references' }
        ];
        
        options.forEach(opt => {
            const button = document.createElement('button');
            button.className = 'verse-option';
            button.setAttribute('data-option', opt.type);
            button.textContent = opt.name;
            verseOptions.appendChild(button);
        });
        
        verseTools.appendChild(verseOptions);
        
        // Mobile verse tools
        const mobileTools = document.createElement('div');
        mobileTools.className = 'verse-mobile-tools';
        
        // Study Tools button and dropdown
        const studyToolsContainer = document.createElement('div');
        studyToolsContainer.className = 'mobile-tool-container';
        
        const studyToolsButton = document.createElement('button');
        studyToolsButton.className = 'mobile-tool-button';
        studyToolsButton.innerHTML = `
            <span>📖 Study Tools</span>
            <span class="arrow">▼</span>
        `;
        
        const studyToolsDropdown = document.createElement('div');
        studyToolsDropdown.className = 'mobile-tool-dropdown';
        
        const studyTools = [
            { name: 'Definitions', option: 'definitions' },
            { name: 'Interlinear', option: 'interlinear' },
            { name: 'Library', option: 'library' },
            { name: 'Topical', option: 'topical' },
            { name: 'Cross Refs', option: 'cross-references' },
        ];
        
        studyTools.forEach(tool => {
            const item = document.createElement('button');
            item.className = 'mobile-dropdown-item';
            item.textContent = tool.name;
            item.dataset.option = tool.option;
            studyToolsDropdown.appendChild(item);
        });
        
        studyToolsContainer.appendChild(studyToolsButton);
        studyToolsContainer.appendChild(studyToolsDropdown);
        
        // Commentaries button and dropdown
        const commentariesContainer = document.createElement('div');
        commentariesContainer.className = 'mobile-tool-container mobile-commentary-tools';
        
        const commentariesButton = document.createElement('button');
        commentariesButton.className = 'mobile-tool-button';
        commentariesButton.innerHTML = `
            <span>💬 Commentaries</span>
            <span class="arrow">▼</span>
        `;
        
        const commentariesDropdown = document.createElement('div');
        commentariesDropdown.className = 'mobile-tool-dropdown';
        
        const commentaries = [
            { name: "Forerunner", commentary: "forerunner" },
            { name: "Adam Clarke", commentary: "clarke" },
            { name: "Barnes' Notes", commentary: "barnes-notes" },
            { name: "Jamieson, Fausset, Brown", commentary: "jamieson-fausset-brown" },
            { name: "Wesley's Notes", commentary: "wesley" },
            { name: "Matthew Henry", commentary: "matthew-henry" },
            { name: "People's Commentary", commentary: "peoples" },
            { name: "Robertson's Word Pictures", commentary: "robertson-commentary" },
            { name: "Scofield", commentary: "scofield" }
        ];
        
        commentaries.forEach(commentary => {
            const item = document.createElement('button');
            item.className = 'mobile-dropdown-item';
            item.textContent = commentary.name;
            item.dataset.commentary = commentary.commentary;
            commentariesDropdown.appendChild(item);
        });
        
        commentariesContainer.appendChild(commentariesButton);
        commentariesContainer.appendChild(commentariesDropdown);
        
        // Book Notes button and dropdown
        const bookNotesContainer = document.createElement('div');
        bookNotesContainer.className = 'mobile-tool-container mobile-booknotes-tools';
        
        const bookNotesButton = document.createElement('button');
        bookNotesButton.className = 'mobile-tool-button';
        bookNotesButton.innerHTML = `
            <span>📚 Book Notes</span>
            <span class="arrow">▼</span>
        `;
        
        const bookNotesDropdown = document.createElement('div');
        bookNotesDropdown.className = 'mobile-tool-dropdown';
        
        const bookNotes = [
            { name: "Barnes' Book Notes", commentary: "barnes-book-notes" },
            { name: "Jamieson, Fausset, Brown", commentary: "jamieson-fausset-brown-notes" },
            { name: "Robertson's NT Notes", commentary: "robertson-notes" }
        ];
        
        bookNotes.forEach(note => {
            const item = document.createElement('button');
            item.className = 'mobile-dropdown-item';
            item.textContent = note.name;
            item.dataset.commentary = note.commentary;
            bookNotesDropdown.appendChild(item);
        });
        
        bookNotesContainer.appendChild(bookNotesButton);
        bookNotesContainer.appendChild(bookNotesDropdown);
        
        // Add all containers to mobile tools
        mobileTools.appendChild(studyToolsContainer);
        mobileTools.appendChild(commentariesContainer);
        mobileTools.appendChild(bookNotesContainer);
        
        verseTools.appendChild(mobileTools);
        verse.appendChild(verseTools);
        
        return verse;
    }
    
    // Get verse text (with fallback)
    function getVerseText(book, chapter, verse, translation) {
        const bookName = bibleData[book] ? bibleData[book].name : book;
        
        // Check if we have actual verse content (only Genesis 1:1-4 have real content)
        if (book === 'genesis' && chapter === 1 && verse >= 1 && verse <= 4) {
            const realVerses = {
                1: "In the beginning God created the heaven and the earth.",
                2: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
                3: "And God said, Let there be light: and there was light.",
                4: "And God saw the light, that it was good: and God divided the light from the darkness."
            };
            return `[${translation.toUpperCase()}] ${realVerses[verse]}`;
        }
        
        // Fallback for all other verses
        return `Filler text for ${bookName} ${chapter}:${verse}. Will display actual verse later.`;
    }
    
    // Update verse texts when translation changes
    function updateVerseTexts() {
        const translation = translationSelect.value;
        const verseTexts = document.querySelectorAll('.verse-text');
        
        verseTexts.forEach(verseText => {
            const verse = verseText.closest('.verse');
            const verseNumber = parseInt(verse.dataset.verse);
            verseText.textContent = getVerseText(globalVerseState.book, globalVerseState.chapter, verseNumber, translation);
        });
    }
    
    // Navigate to previous chapter
    function navigateToPreviousChapter() {
        let newBook = globalVerseState.book;
        let newChapter = globalVerseState.chapter;
        
        if (newChapter > 1) {
            newChapter--;
        } else {
            // Move to previous book
            const bookKeys = Object.keys(bibleData);
            const currentIndex = bookKeys.indexOf(newBook);
            
            if (currentIndex > 0) {
                newBook = bookKeys[currentIndex - 1];
                newChapter = Object.keys(bibleData[newBook].chapters).length;
            }
        }
        
        navigateToVerse(newBook, newChapter, 1);
    }
    
    // Navigate to next chapter
    function navigateToNextChapter() {
        let newBook = globalVerseState.book;
        let newChapter = globalVerseState.chapter;
        
        const numChapters = Object.keys(bibleData[newBook].chapters).length;
        
        if (newChapter < numChapters) {
            newChapter++;
        } else {
            // Move to next book
            const bookKeys = Object.keys(bibleData);
            const currentIndex = bookKeys.indexOf(newBook);
            
            if (currentIndex < bookKeys.length - 1) {
                newBook = bookKeys[currentIndex + 1];
                newChapter = 1;
            }
        }
        
        navigateToVerse(newBook, newChapter, 1);
    }
    
// Parse reference string and navigate
function parseAndNavigateToReference(reference) {
    reference = reference.trim();
    
    if (!reference) {
        alert('Please enter a valid Bible reference');
        return false;
    }
    
    const regex = /^(\d+\s+)?([a-zA-Z]+(?:\s+[a-zA-Z]+)*)\s+(\d+)(?:[:.,-]\s*(\d+))?$/i;
    const match = reference.match(regex);
    
    if (match) {
        let [, bookNum, bookName, chapter, verse] = match;
        
        // Combine number and book name with SPACE if present
        if (bookNum) {
            bookName = (bookNum.trim() + ' ' + bookName.trim()).toLowerCase();
        } else {
            bookName = bookName.toLowerCase().trim();
        }
        
        console.log('Parsed book name:', bookName);
        
        // Check abbreviations first
        if (bookAbbreviations[bookName]) {
            bookName = bookAbbreviations[bookName]; // UPDATE bookName to use the hyphenated version
            console.log('Found in abbreviations, updated to:', bookName);
        }
        
        // At this point bookName should be "1-john" not "1 john"
        
        // Find matching book in bibleData
        let bookId = null;
        
        // Direct match with key
        if (bibleData[bookName]) {
            bookId = bookName;
        } else {
            // Try matching with display name
            for (const id in bibleData) {
                if (bibleData[id].name.toLowerCase() === bookName) {
                    bookId = id;
                    break;
                }
            }
        }
        
        if (bookId) {
            chapter = Math.min(Math.max(1, parseInt(chapter || 1)), Object.keys(bibleData[bookId].chapters).length);
            verse = Math.min(Math.max(1, parseInt(verse || 1)), bibleData[bookId].chapters[chapter]);
            
            console.log('Navigating to:', bookId, chapter, verse);
            navigateToVerse(bookId, chapter, verse);
            return true;
        } else {
            console.error('Could not find book:', bookName);
            alert(`Could not find a matching book for "${bookName}". Please check your spelling.`);
        }
    } else {
        console.error('Regex did not match:', reference);
        alert('Please enter a valid Bible reference (e.g., "John 3:16" or "Psalm 23")');
    }
    
    return false;
}
    
    // ==========================================
    // COMPARISON PANEL - Auto-updates with verse
    // ==========================================
    function updateComparisonPanel() {
        const comparisonTitle = document.getElementById('comparison-title');
        const comparisonContainer = document.getElementById('comparison-container');
        
        if (!comparisonTitle || !comparisonContainer) return;
        
        const reference = globalVerseState.getReferenceString();
        comparisonTitle.textContent = `Compare Translations - ${reference}`;
        
        // Translation list
        const translations = [
            { abbr: 'KJV', name: 'King James Version (KJV)' },
            { abbr: 'NIV', name: 'New International Version (NIV)' },
            { abbr: 'NASB', name: 'New American Standard Bible (NASB)' },
            { abbr: 'NKJV', name: 'New King James Version (NKJV)' },
            { abbr: 'ASV', name: 'American Standard Version (ASV)' },
            { abbr: 'AMP', name: 'Amplified Bible (AMP)' },
            { abbr: 'CEV', name: 'Contemporary English Version (CEV)' },
            { abbr: 'YLT', name: "Young's Literal Translation (YLT)" }
        ];
        
        // Generate comparison items
        comparisonContainer.innerHTML = translations.map(trans => {
            const text = getComparisonText(globalVerseState.book, globalVerseState.chapter, globalVerseState.verse, trans.abbr);
            return `
                <div class="comparison-item">
                    <div class="translation-name">${trans.name}</div>
                    <div class="translation-text">${text}</div>
                </div>
            `;
        }).join('');
    }
    
    function getComparisonText(book, chapter, verse, translation) {
        const bookName = bibleData[book] ? bibleData[book].name : book;
        
        // Only Genesis 1:1-4 have real content
        if (book === 'genesis' && chapter === 1 && verse >= 1 && verse <= 4) {
            const realVerses = {
                1: {
                    'KJV': 'In the beginning God created the heaven and the earth.',
                    'NIV': 'In the beginning God created the heavens and the earth.',
                    'NASB': 'In the beginning God created the heavens and the earth.',
                    'NKJV': 'In the beginning God created the heavens and the earth.',
                    'ASV': 'In the beginning God created the heavens and the earth.',
                    'AMP': 'In the beginning God created the heavens and the earth.',
                    'CEV': 'In the beginning God created the heavens and the earth.',
                    'YLT': 'In the beginning of God\'s preparing the heavens and the earth—'
                },
                2: {
                    'KJV': 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.'
                },
                3: {
                    'KJV': 'And God said, Let there be light: and there was light.'
                },
                4: {
                    'KJV': 'And God saw the light, that it was good: and God divided the light from the darkness.'
                }
            };
            
            return realVerses[verse][translation] || realVerses[verse]['KJV'] || `Filler text for ${bookName} ${chapter}:${verse}. Will display actual verse later.`;
        }
        
        // Fallback for all other verses
        return `Filler text for ${bookName} ${chapter}:${verse}. Will display actual verse later.`;
    }
    
    // ==========================================
    // STUDY PANEL - Auto-updates with verse
    // ==========================================
    let currentStudyOption = null;

function updateStudyPanelIfOpen() {
    const sidePanel = document.getElementById('verse-study-panel');
    if (!sidePanel || sidePanel.classList.contains('hidden')) return;
    
    // Panel is open, update it with current verse WITHOUT calling openStudyPanel
    if (currentStudyOption) {
        const sidePanelContent = document.getElementById('study-panel-content');
        const reference = {
            book: globalVerseState.book,
            chapter: globalVerseState.chapter,
            verse: globalVerseState.verse
        };
        
        // Generate new content
        const content = generateEnhancedStudyContent(currentStudyOption, reference);
        sidePanelContent.innerHTML = content;
        
        // Re-setup navigation and tabs
        setupStudyNavigation();
        setupStudyOptionTabs();
        updateVerseContext(reference);
    }
}

function openStudyPanel(optionType, reference) {
    const sidePanel = document.getElementById('verse-study-panel');
    const sidePanelTitle = document.getElementById('study-panel-title');
    const sidePanelContent = document.getElementById('study-panel-content');
    
    if (!sidePanel) return;
    
    // Store current state
    currentStudyOption = optionType;
    
    // Ensure reference uses numbers
    reference = {
        book: reference.book,
        chapter: parseInt(reference.chapter),
        verse: parseInt(reference.verse)
    };
    
    // Update global state to match - this will trigger comparison panel update
    globalVerseState.update(reference.book, reference.chapter, reference.verse);
    
    // Update the main verse display to match
    const bookName = bibleData[reference.book].name;
    document.getElementById('passage-title').textContent = `${bookName} ${reference.chapter}:${reference.verse}`;

    // Update dropdowns
    bookSelect.value = reference.book;
    updateChapters();
    chapterSelect.value = reference.chapter;
    updateVerses();
    verseSelect.value = reference.verse;
    
    // Ensure the correct verse is highlighted in the main display
    document.querySelectorAll('.verse').forEach(v => v.classList.remove('highlighted'));
    const targetVerse = document.getElementById(`verse-${reference.verse}`);
    if (targetVerse) {
        targetVerse.classList.add('highlighted');
        // Smooth scroll to the verse
        targetVerse.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Set minimum height
    if (sidePanel.classList.contains('hidden')) {
        sidePanel.style.minHeight = '500px';
    } else {
        const currentHeight = sidePanel.offsetHeight;
        sidePanel.style.minHeight = currentHeight + 'px';
    }
    
    // Set active sidebar link
    setActiveSidebarLink(optionType);
    
    // Set title
    const titles = {
        definitions: 'Definitions',
        interlinear: 'Interlinear',
        library: 'Library',
        topical: 'Topical Studies',
        'cross-references': 'Cross References',
        'barnes-notes': 'Barnes\' Notes',
        'matthew-henry': 'Matthew Henry',
        'forerunner': 'Forerunner Commentary',
        'jamieson-fausset-brown': 'Jamieson, Fausset, Brown',
        'scofield': 'Scofield',
        'wesley': 'Wesley\'s Notes',
        'clarke': 'Adam Clarke',
        'peoples': 'People\'s Commentary',
        'robertson-commentary': 'Robertson\'s Word Pictures',
        'barnes-book-notes': 'Barnes\' Book Notes',
        'jamieson-fausset-brown-notes': 'Jamieson, Fausset, Brown Notes',
        'robertson-notes': 'Robertson\'s NT Notes'
    };
    
    const panelTitle = titles[optionType] || 'Study Panel';
    sidePanelTitle.textContent = panelTitle;
    
    // Generate enhanced content with navigation tabs
    let content = generateEnhancedStudyContent(optionType, reference);
    sidePanelContent.innerHTML = content;
    
    // Show panel
    sidePanel.classList.remove('hidden');
    
    // Setup navigation buttons
    setupStudyNavigation();
    
    // Setup study option tabs
    setupStudyOptionTabs();
    
    // Update verse context
    updateVerseContext(reference);
    
    // Allow natural height after content loads
    setTimeout(() => {
        sidePanel.style.minHeight = '400px';
    }, 300);
}

    function generateEnhancedStudyContent(optionType, reference) {
        const bookName = bibleData[reference.book].name;
        
        // Define all available study options
        const studyOptions = [
            { type: 'definitions', label: 'Definitions', icon: '📖' },
            { type: 'interlinear', label: 'Interlinear', icon: '🔤' },
            { type: 'library', label: 'Library', icon: '📚' },
            { type: 'topical', label: 'Topical', icon: '🗂️' },
            { type: 'cross-references', label: 'Cross Refs', icon: '🔗' }
        ];
        
        // Generate navigation tabs
        const tabsHTML = studyOptions.map(option => `
            <button class="study-tab ${option.type === optionType ? 'active' : ''}" 
                    data-option="${option.type}" 
                    title="${option.label}">
                <span class="tab-icon">${option.icon}</span>
                <span class="tab-label">${option.label}</span>
            </button>
        `).join('');
        
        // Get the main content for the selected option
        const mainContent = generateStudyContent(optionType, reference);
        
        return `
            <div class="study-tabs-container">
                <div class="study-tabs">
                    ${tabsHTML}
                </div>
            </div>
            <div class="study-content-area">
                ${mainContent}
            </div>
        `;
    }

    function generateStudyContent(optionType, reference) {
        const bookName = bibleData[reference.book].name;
        const verseRef = `${bookName} ${reference.chapter}:${reference.verse}`;
        
        // Check if we have real content (only Genesis 1:1 has real content)
        if (reference.book === 'genesis' && reference.chapter === 1 && reference.verse === 1) {
            const templateId = `${optionType}-genesis-1-1`;
            const template = document.getElementById(templateId);
            
            if (template) {
                return template.innerHTML;
            }
        }
        
        // Fallback content for all other verses
        const contentTypes = {
            'definitions': 'Definitions',
            'interlinear': 'Interlinear',
            'library': 'Library',
            'topical': 'Topical Studies',
            'cross-references': 'Cross References',
            'barnes-notes': 'Barnes\' Notes Commentary',
            'matthew-henry': 'Matthew Henry Commentary',
            'forerunner': 'Forerunner Commentary',
            'jamieson-fausset-brown': 'Jamieson, Fausset, Brown Commentary',
            'scofield': 'Scofield Commentary',
            'wesley': 'Wesley\'s Notes Commentary',
            'clarke': 'Adam Clarke Commentary',
            'peoples': 'People\'s Commentary',
            'robertson-commentary': 'Robertson\'s Word Pictures',
            'barnes-book-notes': 'Barnes\' Book Notes',
            'jamieson-fausset-brown-notes': 'Jamieson, Fausset, Brown Book Notes',
            'robertson-notes': 'Robertson\'s NT Book Notes'
        };
        
        const contentName = contentTypes[optionType] || 'Study content';
        
        return `
            <div class="commentary-content">
                <div class="commentary-section">
                    <p class="commentary-text">${contentName} is not yet entered for ${verseRef}. Will display actual information later.</p>
                </div>
            </div>
        `;
    }

    function setupStudyOptionTabs() {
        const studyTabs = document.querySelectorAll('.study-tab');

        studyTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const optionType = this.dataset.option;

                if (optionType && optionType !== currentStudyOption) {
                    const studyPanel = document.getElementById('verse-study-panel');
                    const currentHeight = studyPanel.offsetHeight;
                    studyPanel.style.minHeight = Math.max(currentHeight, 400) + 'px';

                    // Capture current scroll position to prevent auto-scrolling
                    const scrollX = window.scrollX || window.pageXOffset;
                    const scrollY = window.scrollY || window.pageYOffset;

                    // Update active tab
                    studyTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');

                    // Update the content area
                    const studyContentArea = document.querySelector('.study-content-area');
                    if (studyContentArea) {
                        studyContentArea.style.opacity = '0.7';

                        setTimeout(() => {
                            const newContent = generateStudyContent(optionType, {
                                book: globalVerseState.book,
                                chapter: globalVerseState.chapter,
                                verse: globalVerseState.verse
                            });
                            studyContentArea.innerHTML = newContent;

                            // Update title
                            const titles = {
                                definitions: 'Definitions',
                                interlinear: 'Interlinear',
                                library: 'Library',
                                topical: 'Topical Studies',
                                'cross-references': 'Cross References'
                            };

                            const sidePanelTitle = document.getElementById('study-panel-title');
                            if (sidePanelTitle) {
                                sidePanelTitle.textContent = titles[optionType] || 'Study Panel';
                            }

                            currentStudyOption = optionType;
                            studyContentArea.style.opacity = '1';
                            setActiveSidebarLink(optionType);

                            // Restore scroll position to prevent auto-scrolling
                            window.scrollTo(scrollX, scrollY);

                            setTimeout(() => {
                                studyPanel.style.minHeight = '400px';
                                // Restore scroll position again after height change
                                window.scrollTo(scrollX, scrollY);
                            }, 200);
                        }, 100);
                    }
                }
            });
        });
    }

    function setupStudyNavigation() {
        const prevButton = document.getElementById('prevVerseStudy');
        const nextButton = document.getElementById('nextVerseStudy');
        
        if (!prevButton || !nextButton) return;
        
        prevButton.replaceWith(prevButton.cloneNode(true));
        nextButton.replaceWith(nextButton.cloneNode(true));
        
        const newPrevButton = document.getElementById('prevVerseStudy');
        const newNextButton = document.getElementById('nextVerseStudy');
        
        const canGoPrev = canNavigateToPreviousVerse();
        const canGoNext = canNavigateToNextVerse();
        
        newPrevButton.disabled = !canGoPrev;
        newNextButton.disabled = !canGoNext;
        
        newPrevButton.addEventListener('click', () => navigateStudyPanel('prev'));
        newNextButton.addEventListener('click', () => navigateStudyPanel('next'));
    }

    function canNavigateToPreviousVerse() {
        return getPreviousVerseReference() !== null;
    }

    function canNavigateToNextVerse() {
        return getNextVerseReference() !== null;
    }

    function navigateStudyPanel(direction) {
        if (!currentStudyOption) return;
        
        let newReference;
        
        if (direction === 'prev') {
            newReference = getPreviousVerseReference();
        } else {
            newReference = getNextVerseReference();
        }
        
        if (newReference) {
            navigateToVerse(newReference.book, newReference.chapter, newReference.verse);
        }
    }

    function getNextVerseReference() {
        const { book, chapter, verse } = globalVerseState;
        const maxVerse = bibleData[book].chapters[chapter];
        
        if (verse < maxVerse) {
            return { book, chapter, verse: verse + 1 };
        } else {
            const maxChapter = Object.keys(bibleData[book].chapters).length;
            
            if (chapter < maxChapter) {
                return { book, chapter: chapter + 1, verse: 1 };
            } else {
                const bookKeys = Object.keys(bibleData);
                const currentIndex = bookKeys.indexOf(book);
                
                if (currentIndex < bookKeys.length - 1) {
                    const nextBook = bookKeys[currentIndex + 1];
                    return { book: nextBook, chapter: 1, verse: 1 };
                }
            }
        }
        
        return null;
    }

    function getPreviousVerseReference() {
        const { book, chapter, verse } = globalVerseState;
        
        if (verse > 1) {
            return { book, chapter, verse: verse - 1 };
        } else if (chapter > 1) {
            const prevChapter = chapter - 1;
            const lastVerse = bibleData[book].chapters[prevChapter];
            return { book, chapter: prevChapter, verse: lastVerse };
        } else {
            const bookKeys = Object.keys(bibleData);
            const currentIndex = bookKeys.indexOf(book);
            
            if (currentIndex > 0) {
                const prevBook = bookKeys[currentIndex - 1];
                const lastChapter = Object.keys(bibleData[prevBook].chapters).length;
                const lastVerse = bibleData[prevBook].chapters[lastChapter];
                return { book: prevBook, chapter: lastChapter, verse: lastVerse };
            }
        }
        
        return null;
    }

    function updateVerseContext(reference) {
        const currentVerseRef = document.getElementById('currentVerseRef');
        const contextVerse = document.getElementById('contextVerse');
        
        if (currentVerseRef && contextVerse) {
            const bookName = bibleData[reference.book].name;
            currentVerseRef.textContent = `${bookName} ${reference.chapter}:${reference.verse}`;
            
            const contextVerseNumber = contextVerse.querySelector('.context-verse-number');
            const contextVerseText = contextVerse.querySelector('.context-verse-text');
            
            if (contextVerseNumber && contextVerseText) {
                contextVerseNumber.textContent = reference.verse;
                
                const translation = translationSelect.value;
                contextVerseText.textContent = getVerseText(reference.book, reference.chapter, reference.verse, translation);
            }
        }
    }

    function setActiveSidebarLink(optionType) {
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            const dataCommentary = link.dataset.commentary;
            if (dataCommentary === optionType) {
                link.classList.add('active');
            }
        });
    }

    // scrollToPanelIfNeeded function removed - auto-scrolling disabled

    function closeStudyPanel() {
        const sidePanel = document.getElementById('verse-study-panel');
        if (sidePanel) {
            sidePanel.classList.add('hidden');
            
            const sidebarLinks = document.querySelectorAll('.sidebar-link');
            sidebarLinks.forEach(link => link.classList.remove('active'));
            
            currentStudyOption = null;
        }
    }

    // Close study panel button
    const closeSidePanelButton = document.getElementById('closeStudyPanel');
    if (closeSidePanelButton) {
        closeSidePanelButton.addEventListener('click', closeStudyPanel);
    }

    // Keyboard navigation for study panel
    document.addEventListener('keydown', function(e) {
        if (!currentStudyOption) return;
        
        const studyPanel = document.getElementById('verse-study-panel');
        if (!studyPanel || studyPanel.classList.contains('hidden')) return;
        
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    navigateStudyPanel('prev');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    navigateStudyPanel('next');
                    break;
            }
        }
    });
    
    // ==========================================
    // VERSE INTERACTIONS
    // ==========================================
    function setupVerseInteractions() {
        const verses = document.querySelectorAll('.verse');
        
        verses.forEach(verse => {
            // Click to highlight verse
            verse.addEventListener('click', function(e) {
                if (e.target.closest('.copy-button') || 
                    e.target.closest('.verse-option') ||
                    e.target.closest('.mobile-tool-button') ||
                    e.target.closest('.mobile-dropdown-item')) {
                    return;
                }
                
                document.querySelectorAll('.verse.highlighted').forEach(v => {
                    if (v !== verse) v.classList.remove('highlighted');
                });
                
                verse.classList.toggle('highlighted');
                
                if (verse.classList.contains('highlighted')) {
                    const verseNum = parseInt(verse.dataset.verse);
                    globalVerseState.update(globalVerseState.book, globalVerseState.chapter, verseNum);
                    verseSelect.value = verseNum;
                }
            });
            
            // Copy button functionality
            const copyButton = verse.querySelector('.copy-button');
            if (copyButton) {
                copyButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    copyVerseToClipboard(verse);
                });
            }
            
            // Desktop verse option buttons
            const verseOptions = verse.querySelectorAll('.verse-option');
            verseOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    const optionType = option.dataset.option;
                    const verseNum = parseInt(verse.dataset.verse);
                    
                    if (!verse.classList.contains('highlighted')) {
                        document.querySelectorAll('.verse.highlighted').forEach(v => {
                            v.classList.remove('highlighted');
                        });
                        verse.classList.add('highlighted');
                        globalVerseState.update(globalVerseState.book, globalVerseState.chapter, verseNum);
                        verseSelect.value = verseNum;
                    }
                    
                    openStudyPanel(optionType, { 
                        book: globalVerseState.book, 
                        chapter: globalVerseState.chapter, 
                        verse: verseNum 
                    });
                });
            });
            
            // Mobile dropdown functionality
            setupMobileDropdowns(verse);
        });
    }

    function setupMobileDropdowns(verse) {
        const mobileToolButtons = verse.querySelectorAll('.mobile-tool-button');
        const mobileDropdownItems = verse.querySelectorAll('.mobile-dropdown-item');
        
        mobileToolButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const container = button.parentElement;
                const dropdown = container.querySelector('.mobile-tool-dropdown');
                const isActive = button.classList.contains('active');
                
                const allButtons = verse.querySelectorAll('.mobile-tool-button');
                const allDropdowns = verse.querySelectorAll('.mobile-tool-dropdown');
                
                allButtons.forEach(btn => btn.classList.remove('active'));
                allDropdowns.forEach(dd => dd.classList.remove('active'));
                
                if (!isActive && dropdown) {
                    button.classList.add('active');
                    dropdown.classList.add('active');
                }
            });
        });
        
        mobileDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                
                const verseNum = parseInt(verse.dataset.verse);
                
                if (!verse.classList.contains('highlighted')) {
                    document.querySelectorAll('.verse.highlighted').forEach(v => {
                        v.classList.remove('highlighted');
                    });
                    verse.classList.add('highlighted');
                    globalVerseState.update(globalVerseState.book, globalVerseState.chapter, verseNum);
                    verseSelect.value = verseNum;
                }
                
                const button = item.closest('.mobile-tool-container').querySelector('.mobile-tool-button');
                const dropdown = item.closest('.mobile-tool-dropdown');
                button.classList.remove('active');
                dropdown.classList.remove('active');
                
                let optionType = item.dataset.option || item.dataset.commentary;
                
                if (optionType) {
                    openStudyPanel(optionType, { 
                        book: globalVerseState.book, 
                        chapter: globalVerseState.chapter, 
                        verse: verseNum 
                    });
                }
            });
        });
    }
    

    
    function copyVerseToClipboard(verseElement) {
        const verseNumber = verseElement.dataset.verse;
        const verseText = verseElement.querySelector('.verse-text').textContent;
        const bookName = bibleData[globalVerseState.book].name;
        const copyButton = verseElement.querySelector('.copy-button');
        
        const textToCopy = `${bookName} ${globalVerseState.chapter}:${verseNumber} - ${verseText}`;
        
        copyButton.style.pointerEvents = 'none';
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => showCopySuccess(copyButton))
                .catch(err => {
                    console.error('Error copying text: ', err);
                    showCopyError(copyButton);
                });
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999);
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showCopySuccess(copyButton);
                } else {
                    showCopyError(copyButton);
                }
            } catch (err) {
                console.error('Fallback: Error copying text', err);
                showCopyError(copyButton);
            }
            
            document.body.removeChild(textArea);
        }
    }

    function showCopySuccess(copyButton) {
        copyButton.classList.add('copied');
        
        setTimeout(() => {
            copyButton.classList.remove('copied');
            copyButton.style.pointerEvents = 'auto';
        }, 2000);
    }

    function showCopyError(copyButton) {
        copyButton.style.pointerEvents = 'auto';
    }
    
// Setup cross-reference links - simple direct approach
function setupCrossReferenceLinks() {
    // Just log that it's being called
    console.log('setupCrossReferenceLinks called');
}

// Use document-level event delegation for all verse-ref clicks
document.addEventListener('click', function(e) {
    // Check if clicked element or its parent is a verse-ref link
    const link = e.target.closest('a.verse-ref');
    
    if (link) {
        console.log('Verse-ref link clicked!', link.textContent);
        e.preventDefault();
        e.stopPropagation();
        
        const refText = link.textContent.trim();
        console.log('Attempting to navigate to:', refText);
        
        const success = parseAndNavigateToReference(refText);
        
        if (success) {
            console.log('Navigation succeeded');
            closeStudyPanel();
        } else {
            console.error('Navigation failed for:', refText);
        }
    }
});
    
// Sidebar commentary links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const highlightedVerse = document.querySelector('.verse.highlighted');
            if (!highlightedVerse) {
                alert('Please select a verse first.');
                return;
            }
            
            const verseNum = parseInt(highlightedVerse.dataset.verse);
            const commentary = this.dataset.commentary;
            
            if (commentary) {
                openStudyPanel(commentary, {
                    book: globalVerseState.book,
                    chapter: globalVerseState.chapter,
                    verse: verseNum
                });
            }
        });
    });
    
// Dark mode toggle

    
    // Function to toggle dark mode
    function toggleDarkMode(isEnabled) {
        if (isEnabled) {
            document.body.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.checked = true;
            if (modeLabel) modeLabel.textContent = 'Dark';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            if (darkModeToggle) darkModeToggle.checked = false;
            if (modeLabel) modeLabel.textContent = 'Light';
            localStorage.setItem('darkMode', 'null');
        }
    }
    
    // Check for saved dark mode preference
    if (savedDarkMode === 'enabled') {
        toggleDarkMode(true);
    } else {
        if (modeLabel) modeLabel.textContent = 'Light';
    }
    
    // Desktop dark mode toggle event listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            toggleDarkMode(this.checked);
        });
        
        // Prevent clicking the toggle from closing the menu when in mobile view
        if (modeToggleContainer) {
            modeToggleContainer.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    
    // Ensure nav links are clickable and work properly
    if (mainNav) {
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Let the link navigate normally - don't prevent default
                // The menu will stay open so user can click multiple links if needed
            });
        });
    }
    
    // ==========================================
    // INITIALIZATION
    // ==========================================
    function initialize() {
        // Set initial values
        globalVerseState.update('genesis', 1, 1);
        
        // Update dropdowns
        updateChapters();
        chapterSelect.value = '1';
        updateVerses();
        verseSelect.value = '1';
        
        // Load initial content
        navigateToVerse('genesis', 1, 1);
        
        // Open Forerunner commentary by default after a brief delay
        setTimeout(() => {
            openStudyPanel('forerunner', {
                book: 'genesis',
                chapter: 1,
                verse: 1
            });
        }, 300);
    }
    
    // Initialize the app
    initialize();

    // Handle single verse selection for study tools
    document.addEventListener('click', function(e) {
        const verse = e.target.closest('.verse');
        if (verse) {
            // Remove single-selected from all verses
            document.querySelectorAll('.verse').forEach(v => {
                v.classList.remove('single-selected');
            });
            
            // Check if only this verse is highlighted
            const highlighted = document.querySelectorAll('.verse.highlighted');
            if (highlighted.length === 1 && highlighted[0] === verse) {
                verse.classList.add('single-selected');
            }
        }
    });
});