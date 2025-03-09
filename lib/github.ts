import axios from 'axios';

const GITHUB_USERNAME = 'abendrothj';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function fetchGitHubProjects() {
  try {
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
      },
    });

    // Map the response data to match your project's structure
    const projects = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      topics: repo.topics,
      html_url: repo.html_url,
      homepage: repo.homepage,
      isFeatured: false, // Set your logic for featured projects
    }));

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}

