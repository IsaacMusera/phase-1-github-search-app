document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    searchUsers(searchInput);
});

function searchUsers(username) {
    const searchUrl = `https://api.github.com/search/users?q=${username}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => displaySearchResults(data.items))
        .catch(error => console.error('Error searching users:', error));
}

function displaySearchResults(users) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" style="width: 50px; height: 50px;">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
            <button onclick="getUserRepos('${user.login}')">Show Repositories</button>
        `;
        searchResultsContainer.appendChild(userElement);
    });
}

function getUserRepos(username) {
    const reposUrl = `https://api.github.com/users/${username}/repos`;

    fetch(reposUrl)
        .then(response => response.json())
        .then(data => displayUserRepos(username, data))
        .catch(error => console.error(`Error fetching ${username}'s repositories:`, error));
}

function displayUserRepos(username, repos) {
    const userReposContainer = document.createElement('div');
    userReposContainer.innerHTML = `<h2>${username}'s Repositories</h2>`;

    const repoList = document.createElement('ul');
    repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        repoList.appendChild(repoItem);
    });

    userReposContainer.appendChild(repoList);
    document.getElementById('searchResults').appendChild(userReposContainer);
}
