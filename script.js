// Nomes que não podem ser sorteados
const NOMES_BLOQUEADOS = ['espina', 'bundinha', 'mathé', 'mathe'];

function getAllNames() {
    const input = document.getElementById('namesInput').value;
    if (!input.trim()) return [];
    return input.split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);
}

function getValidNames(names) {
    return names.filter(name => !NOMES_BLOQUEADOS.includes(name.toLowerCase()));
}

function sortear() {
    const allNames = getAllNames();
    const validNames = getValidNames(allNames);

    if (allNames.length === 0) {
        alert('Por favor, insira pelo menos um nome para sortear.');
        return;
    }

    if (validNames.length === 0) {
        alert('Não há nomes válidos para sortear.');
        return;
    }

    const resultContainer = document.getElementById('resultContainer');
    const winnerNameElement = document.getElementById('winnerName');
    const drawButton = document.getElementById('drawButton');

    // UI State for Drawing
    drawButton.disabled = true;
    drawButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sorteando...';
    resultContainer.classList.remove('hidden');

    // Animation Logic - mostra TODOS os nomes na animação
    let duration = 3000; // 3 seconds total
    let interval = 50; // Update every 50ms
    let startTime = Date.now();

    const animationInterval = setInterval(() => {
        const randomName = allNames[Math.floor(Math.random() * allNames.length)];
        winnerNameElement.innerText = randomName;
        winnerNameElement.style.opacity = 0.5;

        // Check if finished
        if (Date.now() - startTime > duration) {
            clearInterval(animationInterval);
            finalizeDraw(validNames, winnerNameElement, drawButton);
        }
    }, interval);
}

function finalizeDraw(names, displayElement, buttonElement) {
    const winner = names[Math.floor(Math.random() * names.length)];

    // Smooth stop
    displayElement.style.opacity = 1;
    displayElement.innerText = winner;

    // Restore button
    buttonElement.innerHTML = '<span>Sortear Novamente</span><i class="fa-solid fa-rotate-right"></i>';
    buttonElement.disabled = false;
    buttonElement.onclick = resetar; // Change action to reset or just re-draw

    // Confetti Effect
    triggerConfetti();
}

function resetar() {
    const resultContainer = document.getElementById('resultContainer');
    const drawButton = document.getElementById('drawButton');
    const input = document.getElementById('namesInput');

    resultContainer.classList.add('hidden');

    // Reset button state
    drawButton.innerHTML = '<span>Sortear Agora</span><i class="fa-solid fa-wand-magic-sparkles"></i>';
    drawButton.onclick = sortear;

    input.focus();
}

function triggerConfetti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
