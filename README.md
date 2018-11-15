# openartifact-web

OpenArtifact Web UI: A web interface for viewing Artifact data.

Quickstart
----
* Clone the repo using `git clone --recurse-submodules git://github.com/openartifact/web`
  * If you already have a copy of the repo, run `git submodule init && git submodule update` to fetch shared components
* Install Node.js (6.0.0 or greater) (on Ubuntu, `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - && sudo apt-get install -y nodejs`)
* `npm install`
* `npm start`
* Visit port 3000 on your development machine.
* Make some changes.
* `npm run lint` to check your code for linting errors.
* `npm test` to check all app routes for uncaught JavaScript errors.
* Submit a pull request. Wait for review and merge.
* Congratulations! You're a contributor.

Configuration
----
* You can set the following environment variables:
  * PORT: Changes the port that the development server runs on
  * REACT_APP_API_HOST: Changes the API that the UI requests data from

Tech Stack
----
* View: React
* State Management: Redux
* CSS: styled-components

Workflow
----
* If you're interested in contributing regularly, let us know and we'll add you to the organization.
* The `master` branch is automatically deployed to the stage environment.
* We'll periodically ship releases to production.

Notes
----
* You don't have to set up the entire stack (databases, etc.), or worry about getting starter data, since the UI points to the production API.
* Use the configuration to point to your own API (if you are working on a new feature and want to start building the UI before it's deployed to production).
* Discord: https://discord.gg/opendota
  * Strongly recommended for active developers! We move fast and it's helpful to be up to speed with everything that's happening.
  