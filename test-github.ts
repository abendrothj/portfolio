import { fetchGitHubProjects, fetchGitHubStats } from './lib/github';

async function testGitHubIntegration() {
  console.log('Testing GitHub API Integration...\n');

  try {
    console.log('1. Testing repository fetching:');
    const projects = await fetchGitHubProjects();
    console.log(`✓ Successfully fetched ${projects.length} repositories`);
    console.log('First repository:', projects[0]);
    console.log('\n-------------------\n');

    console.log('2. Testing GitHub stats:');
    const stats = await fetchGitHubStats();
    console.log('✓ Successfully fetched GitHub stats:');
    console.log(`Total Repositories: ${stats.totalRepos}`);
    console.log(`Total Stars: ${stats.totalStars}`);
    console.log(`Total Forks: ${stats.totalForks}`);
    console.log('\nTop Languages:');
    stats.topLanguages.forEach(lang => {
      console.log(`${lang.name}: ${lang.percentage}%`);
    });

  } catch (error) {
    console.error('Error testing GitHub integration:', error);
  }
}

testGitHubIntegration(); 