import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:2223',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  }, 

  
})