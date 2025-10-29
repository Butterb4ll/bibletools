// Definitions Page JavaScript - Handles interactions only

document.addEventListener('DOMContentLoaded', function() {
    const letterButtons = document.querySelectorAll('.letter-btn');
    const definitionContainers = document.querySelectorAll('.definitions-container');
    const currentLetterDisplay = document.querySelector('.current-letter');
    const letterNav = document.getElementById('letterNav');
    
    let currentLetter = 'A';
    let lastScrollY = window.pageYOffset;
    let scrollingDown = false;
    
    // Letter selection
    letterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const letter = this.dataset.letter;
            selectLetter(letter);
        });
    });
    
    function selectLetter(letter) {
        currentLetter = letter;
        
        // Update active button
        letterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-letter="${letter}"]`).classList.add('active');
        
        // Update display
        currentLetterDisplay.textContent = letter;
        
        // Show/hide appropriate containers
        definitionContainers.forEach(container => {
            if (container.dataset.letter === letter) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        });
        
        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Toggle definition items
    document.addEventListener('click', function(e) {
        const header = e.target.closest('.definition-header');
        if (header) {
            const item = header.closest('.definition-item');
            item.classList.toggle('expanded');
        }
    });
    
    // Source tab switching
    document.addEventListener('click', function(e) {
        const tab = e.target.closest('.source-tab');
        if (tab) {
            e.stopPropagation();
            const item = tab.closest('.definition-item');
            const source = tab.dataset.source;
            
            // Update tabs
            item.querySelectorAll('.source-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update content
            item.querySelectorAll('.source-content').forEach(c => c.classList.remove('active'));
            item.querySelector(`.source-content[data-source="${source}"]`).classList.add('active');
        }
    });
    
    // Action buttons
    document.addEventListener('click', function(e) {
        const copyBtn = e.target.closest('.copy-btn');
        if (copyBtn) {
            e.stopPropagation();
            handleCopy(copyBtn);
        }
    });
    
    function handleCopy(button) {
        const sourceContent = button.closest('.source-content');
        const word = sourceContent.closest('.definition-item').querySelector('.definition-word').textContent;
        const title = sourceContent.querySelector('.source-title').textContent;
        const text = sourceContent.querySelector('.definition-text').textContent;
        
        const fullText = `${word}\n${title}\n\n${text}`;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(fullText).then(() => {
                showNotification('Copied to clipboard!');
            }).catch(err => {
                console.error('Copy failed:', err);
            });
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = fullText;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                showNotification('Copied to clipboard!');
            } catch (err) {
                console.error('Copy failed:', err);
            }
            
            document.body.removeChild(textArea);
        }
    }
    
    function handleShare(button) {
        showNotification('Share functionality coming soon!');
    }
    
    function handlePDF(button) {
        showNotification('PDF download functionality coming soon!');
    }
    
    // Cross-reference links
    document.addEventListener('click', function(e) {
        const crossRef = e.target.closest('.cross-reference');
        if (crossRef) {
            e.preventDefault();
            e.stopPropagation();
            
            const ref = crossRef.dataset.ref;
            const source = crossRef.dataset.source;
            
            handleCrossReference(ref, source);
        }
    });
    
    function handleCrossReference(ref, source) {
        const targetId = `def-${ref.toLowerCase()}`;
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) {
            // Try switching letters
            const firstLetter = ref.charAt(0).toUpperCase();
            selectLetter(firstLetter);
            
            setTimeout(() => {
                handleCrossReference(ref, source);
            }, 300);
            return;
        }
        
        // Show the letter that contains this definition
        const container = targetElement.closest('.definitions-container');
        if (container && container.classList.contains('hidden')) {
            const letter = container.dataset.letter;
            selectLetter(letter);
        }
        
        // Expand if not already expanded
        if (!targetElement.classList.contains('expanded')) {
            targetElement.classList.add('expanded');
        }
        
        // Switch to the correct source tab if specified
        if (source) {
            const tabs = targetElement.querySelectorAll('.source-tab');
            const contents = targetElement.querySelectorAll('.source-content');
            
            tabs.forEach(tab => {
                if (tab.dataset.source === source) {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    contents.forEach(c => c.classList.remove('active'));
                    targetElement.querySelector(`.source-content[data-source="${source}"]`).classList.add('active');
                }
            });
        }
        
        // Scroll to element
        setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Highlight effect
            targetElement.style.backgroundColor = 'var(--highlight-color)';
            setTimeout(() => {
                targetElement.style.backgroundColor = '';
            }, 2000);
        }, 100);
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: var(--accent-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
    

});