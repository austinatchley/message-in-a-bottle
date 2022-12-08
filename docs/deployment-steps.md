
# Deployment Steps

In order to setup deployments, follow the steps in [the README for the Blues Stack repo on GitHub](https://github.com/remix-run/blues-stack).

Once you have this set up, your deployments will use a combination of GitHub Actions and the Fly.io CLI to keep your application up to date. 

GitHub Actions will trigger the deployment workflow on each commit to the master branch. This behavior is configurable through the `deploy.yml` file in the `.github/workflows` directory of this repo.

By storing a Fly.io API auth token in our GitHub Actions Secrets, we are able to use Fly.io's multi-purposed command line tool after fetching the token secret, and the Actions deployment script will take care of the rest for you. However, before this all works smoothly, you might have to modify your `fly.toml` configuration, which is in the root directory of this repo. 

For example, if you change the name of your project, then it's possible you have to perform some manual modifications to get the Fly configuration to find matching resources deployed to Fly.io. If this is necessary, you might first see an error in the GitHub Actions logs, saying that the Fly.io URL was met with a 404 response.
