let currentStep = 1;
let formData = {
    jobTitle: '',
    jobDescription: '',
    criteriaCount: 5,
    criteria: [],
    resumes: []
};

// Load data from localStorage if exists
const savedData = localStorage.getItem('resumeRankerData');
if (savedData) {
    formData = JSON.parse(savedData);
}

function startNewJob() {
    document.getElementById('jobsView').classList.add('hidden');
    document.getElementById('stepFormView').classList.remove('hidden');
    updateProgress(1);
}

function updateProgress(step) {
    currentStep = step;
    document.querySelectorAll('.step').forEach(stepEl => {
        const stepNum = parseInt(stepEl.dataset.step);
        stepEl.classList.remove('active', 'completed');
        if (stepNum === currentStep) {
            stepEl.classList.add('active');
        } else if (stepNum < currentStep) {
            stepEl.classList.add('completed');
        }
    });

    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(`step${step}`).classList.remove('hidden');
}

function nextStep(step) {
    if (step === 2) {
        const title = document.getElementById('jobTitle').value;
        const description = document.getElementById('jobDescription').value;
        
        if (!title || !description || description.length < 150) {
            alert('Please fill in all required fields. Job description must be at least 150 characters.');
            return;
        }

        formData.jobTitle = title;
        formData.jobDescription = description;
    }

    updateProgress(step);
    saveToLocalStorage();
}

function prevStep() {
    updateProgress(currentStep - 1);
}

function adjustCriteria(change) {
    const countEl = document.getElementById('criteriaCount');
    let count = parseInt(countEl.textContent);
    count = Math.max(1, Math.min(10, count + change));
    countEl.textContent = count;
    formData.criteriaCount = count;
}

function generateCriteria() {
    const loader = document.getElementById('criteriaLoader');
    const criteriaList = document.getElementById('criteriaList');
    const saveCriteriaBtn = document.getElementById('saveCriteriaBtn');

    loader.classList.remove('hidden');
    criteriaList.innerHTML = '';
    saveCriteriaBtn.classList.add('hidden');

    setTimeout(() => {
        loader.classList.add('hidden');
        formData.criteria = Array.from({length: formData.criteriaCount}, (_, i) => ({
            id: i + 1,
            name: `Criteria ${i + 1}`,
            weight: 10
        }));
        renderCriteria();
        saveCriteriaBtn.classList.remove('hidden');
    }, 2000);
}

function renderCriteria() {
    const container = document.getElementById('criteriaList');
    container.innerHTML = formData.criteria.map(criterion => `
        <div class="criteria-item">
            <span>${criterion.name}</span>
            <input type="number" min="1" max="10" value="${criterion.weight}"
                onchange="updateCriteriaWeight(${criterion.id}, this.value)">
        </div>
    `).join('');
}

function updateCriteriaWeight(id, weight) {
    formData.criteria = formData.criteria.map(c => 
        c.id === id ? {...c, weight: parseInt(weight)} : c
    );
}

function saveCriteria() {
    saveToLocalStorage();
    nextStep(3);
}

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    if (files.length > 500) {
        alert('Maximum 500 files allowed');
        return;
    }

    formData.resumes = Array.from(files);
    document.getElementById('selectedCount').textContent = files.length;
    renderResumes();
}

function renderResumes() {
    const container = document.getElementById('resumeList');
    container.innerHTML = formData.resumes.map(file => `
        <div class="resume-item">${file.name}</div>
    `).join('');
}

function generateRankings() {
    return formData.resumes.map((resume, index) => ({
        name: resume.name,
        score: Math.floor(Math.random() * 100)
    })).sort((a, b) => b.score - a.score);
}

function renderRankings() {
    const rankings = generateRankings();
    const container = document.getElementById('rankingList');
    container.innerHTML = rankings.map((ranking, index) => `
        <div class="ranking-item">
            <span>#${index + 1}</span>
            <span>${ranking.name}</span>
            <span>Score: ${ranking.score}</span>
        </div>
    `).join('');
}

function finishProcess() {
    alert('Process completed! You can view the rankings on the dashboard.');
    location.reload();
}

function saveToLocalStorage() {
    localStorage.setItem('resumeRankerData', JSON.stringify(formData));
}

document.getElementById('jobDescription').addEventListener('input', function(e) {
    const charCount = e.target.value.length;
    document.querySelector('.char-count').textContent = 
        `${charCount} / Min: 150 - Max: 10,000 characters`;
});

updateProgress(1);