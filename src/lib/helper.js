export function formatTime(seconds) {
    // Convert seconds to hours, minutes, and remaining seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format the time components with leading zeros if necessary
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    // Return the formatted time string in h:m:s format
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function getTimePercentage(currentTime, duration) {
    // Ensure currentTime and duration are valid numbers and duration is greater than 0
    if (isNaN(currentTime) || isNaN(duration) || duration <= 0) {
        return 0;
    }

    // Calculate the percentage of time elapsed and round it to the nearest whole number
    let percentage = ((currentTime / duration) * 100);

    // Ensure the percentage is within the range of 0 to 100
    if (percentage < 0) {
        percentage = 0;
    } else if (percentage > 100) {
        percentage = 100;
    }

    return percentage;
}

