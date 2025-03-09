import axios, { AxiosError, AxiosResponse } from 'axios';

const GITHUB_USERNAME = 'abendrothj';
const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  languages_url: string;
}

interface LanguageStats {
  [key: string]: number;
}

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; percentage: number }[];
}

const githubClient = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github+json',
  },
});

// Helper function to handle GitHub API errors
function handleGitHubError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403 && axiosError.response.headers['x-ratelimit-remaining'] === '0') {
      console.error('GitHub API rate limit exceeded');
      throw new Error('GitHub API rate limit exceeded');
    }
  }
  console.error('GitHub API error:', error);
  throw error;
}

export async function fetchGitHubProjects() {
  try {
    const response = await githubClient.get<GitHubRepo[]>(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    
    // Map the response data to match your project's structure
    const projects = response.data.map((repo: GitHubRepo) => ({
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
    handleGitHubError(error);
    return [];
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    // Fetch all repositories
    const reposResponse = await githubClient.get<GitHubRepo[]>(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    const repos = reposResponse.data;

    // Calculate basic stats
    const totalRepos = repos.length;
    const totalStars = repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.forks_count, 0);

    // Fetch language statistics for each repository
    const languagePromises = repos.map((repo: GitHubRepo) => 
      githubClient.get<LanguageStats>(repo.languages_url)
    );
    const languageResponses = await Promise.all(languagePromises);

    // Aggregate language statistics
    const languageTotals: LanguageStats = {};
    let totalBytes = 0;

    languageResponses.forEach((response: AxiosResponse<LanguageStats>) => {
      const stats = response.data;
      Object.entries(stats).forEach(([language, bytes]) => {
        if (typeof bytes === 'number') {
          languageTotals[language] = (languageTotals[language] || 0) + bytes;
          totalBytes += bytes;
        }
      });
    });

    // Calculate percentages and sort languages by usage
    const topLanguages = Object.entries(languageTotals)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / totalBytes) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5); // Get top 5 languages

    return {
      totalRepos,
      totalStars,
      totalForks,
      topLanguages,
    };
  } catch (error) {
    handleGitHubError(error);
    return {
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      topLanguages: [],
    };
  }
}

