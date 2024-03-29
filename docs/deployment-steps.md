# Deployment Steps

## Notes

In order to setup deployments, follow the steps in [the README for the Blues Stack repo on GitHub](https://github.com/remix-run/blues-stack).

Once you have this set up, your deployments will use a combination of GitHub Actions and the Fly.io CLI tool `flyctl` to keep your application up to date.

GitHub Actions will trigger the deployment workflow on each commit to the master branch. This behavior is configurable through the `deploy.yml` file in the `.github/workflows` directory of this repo.

By storing a Fly.io API auth token in our GitHub Actions Secrets, we are able to use `flyctl` with the attached token secret, and the Actions deployment script will take care of the rest. Before this all works smoothly, you might have to modify your `fly.toml` configuration, which is in the root directory of this repo.

For example, if you change the name of your project, then it's possible you have to perform some manual modifications to get the Fly configuration to find matching resources deployed to Fly.io. If this is necessary, you might first see an error in the GitHub Actions logs, saying that the Fly.io URL was met with a 404 response.

## Deployment Commands and Utilities

### Trigger GitHub Actions

```
git push
```

### Building Locally

```
npm run docker
npm run build
npm run dev
```

### Fly.io Utilities

```
fly list apps
```

## Important dotfiles for Deployment

`.github/workflows/deploy.yml` controls GitHub Actions

`Dockerfile` controls the docker build step, which is needed for both the db and the server build

`.env` gets created in build environments to store the db URL and session creds. When deploying through GitHub Actions, this file is created and cached. It shouldn't be committed to version control

`fly.toml` controls the Fly configuration, including a small snippet of build code. This step has a sneaky step where the server triggers db migrations on changes to the schema

`prisma/schema.prisma` defines the Prisma schema, which is used to control the DB schema as well as generating native TypeScript types for the defined database objects
