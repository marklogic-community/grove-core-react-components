/* eslint-env node */
module.exports = {
  apps: [
    {
      name: 'grove-react-storybook',
      script: '/usr/bin/http-server',
      args: ['-p', '8099'],
      cwd: './.storybook/',
      watch: true,
      restart_delay: 4000,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        GROVE_UI_BUILD_PATH: '../ui/dist/'
      }
    }
  ],
  deploy: {
    production: {
      key: '/Users/gjosten/.ssh/id_rsa',
      user: 'gjosten',
      host: ['van-9b.demo.marklogic.com'],
      ref: 'origin/master',
      repo:
        'git@github.com:marklogic-community/grove-core-react-components.git',
      path: '/space/projects/grove-react-storybook',
      'post-deploy':
        'npm install && npm run test && npm run build && npm run buildStorybook'
    }
  }
};
