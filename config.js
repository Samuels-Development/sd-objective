const config = {    
    // UI Position Settings
    position: 'top-right', // Options: 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center',

    // UI Appearance Settings
    theme: 'dark', // Options: 'light', 'dark', or 'custom'
    // if theme is set to 'custom', the colors under 'customColors' will be used and can be easily edited by you.
    customColors: {
        title: '#004d99',         // Custom color for the title text
        description: '#333',      // Custom color for the description text
        progressBar: {
            startColor: '#00c853', // Custom start color of progress bar gradient
            endColor: '#b2ff59'    // Custom end color of progress bar gradient
        },
        containerBackground: 'rgba(255, 255, 255, 0.8)' // Custom background color of the container
    },

    // Progress Bar Settings
    progressBarWidth: '300px',    // Width of the progress bar

    // Animation Settings
    progressBarAnimation: {
        duration: '0.5s',        // Duration of progress bar animation
        easing: 'ease'           // Easing type for the animation
    }
};