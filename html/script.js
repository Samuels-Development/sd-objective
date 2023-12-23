let currentProgress = 0;
let totalSteps = 0;

document.addEventListener('DOMContentLoaded', function() {
    applyConfigurations();
    initializeUI();
});

function initializeUI() {
    const container = document.getElementById('objective-container');
    container.style.opacity = 0;
    container.style.display = 'none';
}

function applyConfigurations() {
    setPosition(config.position);

    const container = document.getElementById('objective-container');
    const title = document.getElementById('objective-title');
    const description = document.getElementById('objective-description');
    const progressBar = document.getElementById('objective-progress');

    switch (config.theme) {
        case 'light':
            container.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            title.style.color = '#004d99';
            description.style.color = '#333';
            progressBar.style.background = 'linear-gradient(to right, #00c853, #b2ff59)';
            break;
        case 'dark':
            container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            title.style.color = '#fff';
            description.style.color = '#ccc';
            progressBar.style.background = 'linear-gradient(to right, #007bff, #6610f2)';
            break;
        case 'custom':
            container.style.backgroundColor = config.customColors.containerBackground;
            title.style.color = config.customColors.title;
            description.style.color = config.customColors.description;
            progressBar.style.background = `linear-gradient(to right, ${config.customColors.progressBar.startColor}, ${config.customColors.progressBar.endColor})`;
            break;
    }

    progressBar.style.transition = `width ${config.progressBarAnimation.duration} ${config.progressBarAnimation.easing}`;
    container.style.transition = 'opacity 0.5s ease-in-out';
}

function setPosition(position) {
    const container = document.getElementById('objective-container');
    container.style.position = 'absolute';

    switch(position) {
        case 'top-left':
            container.style.top = '0';
            container.style.left = '0';
            break;
        case 'top-right':
            container.style.top = '0';
            container.style.right = '0';
            break;
        case 'bottom-left':
            container.style.bottom = '0';
            container.style.left = '0';
            break;
        case 'bottom-right':
            container.style.bottom = '0';
            container.style.right = '0';
            break;
        case 'center':
            container.style.top = '50%';
            container.style.left = '50%';
            container.style.transform = 'translate(-50%, -50%)';
            break;
        case 'middle-right':
            container.style.top = '50%';
            container.style.right = '0';
            container.style.transform = 'translateY(-50%)';
            break;
        case 'middle-left':
            container.style.top = '50%';
            container.style.left = '0';
            container.style.transform = 'translateY(-50%)';
            break;
        case 'middle-top':
            container.style.top = '0';
            container.style.left = '50%';
            container.style.transform = 'translateX(-50%)';
            break;
        case 'bottom-middle':
            container.style.bottom = '0';
            container.style.left = '50%';
            container.style.transform = 'translateX(-50%)';
            break;
        default:
            container.style.top = '0';
            container.style.left = '0';
    }
}

function showUI() {
    const container = document.getElementById('objective-container');
    container.style.display = 'block';
    setTimeout(() => container.style.opacity = 1, 10);
}

function hideUI() {
    const container = document.getElementById('objective-container');
    container.style.opacity = 0;
    setTimeout(() => container.style.display = 'none', 500);
}

function updateProgressBar() {
    let progressPercentage = (currentProgress / totalSteps) * 100;
    document.getElementById('objective-progress').style.width = progressPercentage + '%';
}

window.addEventListener('message', function(event) {
    var data = event.data;
    
    if (data.type === 'objective') {
        if (data.show) {
            currentProgress = 0;
            totalSteps = data.steps;
            document.getElementById('objective-title').innerText = data.title;
            document.getElementById('objective-description').innerText = data.description;
            showUI();
            updateProgressBar();
        } else {
            hideUI();
        }
    }

    if (data.type === 'progressUpdate') {
        currentProgress++;
        updateProgressBar();

        if (currentProgress === totalSteps) {
            setTimeout(hideUI, 2000);
        }
    }
    if (data.type === 'descriptionUpdate') {
        document.getElementById('objective-description').innerText = data.description;
    }
});
