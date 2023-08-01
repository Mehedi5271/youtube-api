const apiKey = 'AIzaSyBgUjMaTjLLvAOGdQcIik_k_eW6EFKniXs';

function displaySearchResults(items) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    items.forEach((item) => {
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;
        const videoThumbnail = item.snippet.thumbnails.medium.url;

        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                <img src="${videoThumbnail}" alt="${videoTitle}">
                <p>${videoTitle}</p>
            </a>
        `;

        resultsContainer.appendChild(videoElement);
    });
}

async function searchVideos() {
    const searchInput = document.getElementById('searchInput').value;

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchInput}&key=${apiKey}&part=snippet&type=video`);

        if (!response.ok) {
            throw new Error('Failed to search videos.');
        }

        const data = await response.json();
        displaySearchResults(data.items);
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('searchBtn').addEventListener('click', searchVideos);
