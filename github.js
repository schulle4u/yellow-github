// Github extension, https://github.com/schulle4u/yellow-github

// Fetch commits for a given repository container
async function fetchCommits(githubElement) {
    if (!githubElement || !githubElement.dataset) {
        console.error('Invalid repository element.');
        return;
    }

    // Fetch configuration
    const owner = githubElement.dataset.githubOwner || 'datenstrom';
    const repo = githubElement.dataset.githubRepo || 'yellow';
    const numberOfCommits = parseInt(githubElement.dataset.numberOfCommits || '5', 10);

    const commitsListContainer = githubElement.querySelector('.github-commits-list');

    if (!owner || !repo) {
        console.warn('Owner or repository missing for Github element:', githubElement);
        return;
    }
    if (!commitsListContainer) {
        console.error('Element with class "commits-list" not found in', githubElement);
        return;
    }

    commitsListContainer.innerHTML = 'Loading commits...';


    // API Endpoint
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${numberOfCommits}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown API error' }));
            throw new Error(`GitHub API error for ${owner}/${repo}: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const commits = await response.json();

        if (commits.length === 0) {
            commitsListContainer.innerHTML = '<p>No commits.</p>';
            return;
        }

        commitsListContainer.innerHTML = '';

        commits.forEach(commit => {
            const commitMessage = commit.commit.message;
            const messageLines = commit.commit.message.split('\n');
            const commitSummary = messageLines[0] || 'Undefined';
            let commitDescription = '';
            if (messageLines.length > 1) {
                let descriptionStartIndex = 1;
                while (descriptionStartIndex < messageLines.length && messageLines[descriptionStartIndex].trim() === '') {
                    descriptionStartIndex++;
                }
                if (descriptionStartIndex < messageLines.length) {
                    commitDescription = messageLines.slice(descriptionStartIndex).join('<br>');
                }
            }
            const commitAuthor = commit.commit.author ? commit.commit.author.name : 'Unknown author';
            
            const dateObj = new Date(commit.commit.author.date);
            const padToTwoDigits = (num) => String(num).padStart(2, '0');
            const year = dateObj.getFullYear();
            const month = padToTwoDigits(dateObj.getMonth() + 1);
            const day = padToTwoDigits(dateObj.getDate());
            const hours = padToTwoDigits(dateObj.getHours());
            const minutes = padToTwoDigits(dateObj.getMinutes());
            const commitDate = `${year}-${month}-${day} ${hours}:${minutes}`;
            
            const commitUrl = commit.html_url;

            const commitElement = document.createElement('li');
            commitElement.classList.add('github-commit-item');

            commitElement.innerHTML = `
                <a href="${commitUrl}" target="_blank" rel="noopener noreferrer" class="github-commit-link">${commitSummary}</a>
                ${commitDescription ? `<p class="github-commit-description">${commitDescription}</p> ` : ''}
                <p class="github-commit-meta">(${commitAuthor} | ${commitDate})</p>
            `;

            commitsListContainer.appendChild(commitElement);
        });

    } catch (error) {
        console.error('Error fetching commits for', owner, '/', repo, ':', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const repoSections = document.querySelectorAll('.github-repo-section');

    repoSections.forEach(repoSection => {
        fetchCommits(repoSection);
    });
});