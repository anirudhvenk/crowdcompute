import React from 'react';

const GITHUB_CLIENT_ID = '76b19a431569f2ae5645';
const GITHUB_CLIENT_SECRET = '15fd7a37c2e34618aa78d3920d64680185da30ff';
const GITHUB_CALLBACK_URL = 'http://your_site.com/auth/github/callback';
const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`;

const GitHubOAuth = () => {
  const handleLogin = async (code) => {
    try {
      // Exchange the code for an access token
      const data = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            body: {
                  client_id: GITHUB_CLIENT_ID,
                  client_secret: GITHUB_CLIENT_SECRET,
                  code,
            },
            headers: {
                  'Content-Type': 'application/json'
            }
        }).then((response) => response.json());

      const accessToken = data.access_token;

      // Fetch the user's GitHub profile
      const userProfile = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': 'Your-App-Name'
        }
      });

      // Handle the user profile data (e.g., store it in your database and log the user in)
      console.log(`Welcome, ${userProfile.data.name}!`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGitHubCallback = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    
    if (code) {
      handleLogin(code);
    }
  };

  React.useEffect(() => {
    handleGitHubCallback();
  }, []);

  return (
    <div>
      <a href={githubOAuthURL}>Sign in with GitHub</a>
    </div>
  );
};

export default GitHubOAuth;
