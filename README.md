[![Netlify Status](https://api.netlify.com/api/v1/badges/d419806f-0315-41c6-917a-52167ab9902c/deploy-status)](https://app.netlify.com/sites/the-collab-lab/deploys)

# 🖥 The Collab Lab Website

The source repository for [The Collab Lab website](https://the-collab-lab.codes/).

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#-built-with">🛠 Built With</a>
    </li>
    <li>
      <a href="#-getting-started">📝 Getting Started</a>
      <ul>
        <li>
          <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#installation">Installation</a>
        </li>
        <li>
          <a href="#graphql-introspection">GraphQL</a>
          <ul>
            <li>
              <a href="#vs-code">VS Code</a>
            </li>
            <li>
              <a href="#intellij">IntelliJ</a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <a href="#-usage">🔬 Usage</a>
    </li>
    <li>
      <a href="#contributing">✨Contributing</a>
      <ul>
        <li>
          <a href="#how-to-fork-the-project">How to Fork the Project</a>
        </li>
      </ul>
    </li>
  </ol>
</details>

## 🛠 Built With

- ⚡️ [11ty](https://www.11ty.dev/) - Static Site Generator built on top of various HTML template engines
- 💧 [Liquid](https://shopify.github.io/liquid/) - Open source templating language
- 📡 [GraphQL](https://www.graphql.com/) - Data Querying from our CMS
- 💵 [Stripe](https://stripe.com/docs/api?lang=node) - Processing payments for donations
- 🖥 [Netlify](https://www.netlify.com/) - Continuous Deployment / Integration

## 📝 Getting Started

### Prerequisites

This website requires Node and NPM to be installed in order to run locally. You can view [this documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to learn more about installation.

You may also need the [Netlify CLI](https://cli.netlify.com/) to test certain features such as the Stripe donation buttons. If you need access to Netlify, you can request access in [#committee-website](https://the-collab-lab.slack.com/archives/CUS0DJ614) and someone will invite you to the Netlify project.

### Installation

Clone the website using [Github CLI](https://cli.github.com/).

```shell
gh repo clone the-collab-lab/website
```

Run `npm i` in the repository directory to install all the necessary packages and to set up [Husky](https://typicode.github.io/husky/#/) for pre-commit linting.

### GraphQL Introspection

Use [this link](https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master) to access the playground and schema for our GraphQL endpoint.

Depending on your IDE, you may have the ability to introspect the schema and unlock type checking in your editor:

#### VS Code

1. Install both the [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode) and [GraphQL: Language Feature Support](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) plugins.
2. Create a `graphql.config.json` and copy/paste the json found below.
3. VSCode will automatically introspect the schema without having to create a schema file.

#### IntelliJ

1. Install the [GraphQL Plugin](https://plugins.jetbrains.com/plugin/8097-graphql).
2. Create a `.graphqlconfig` file and copy/paste the json found below.
3. Use the GraphQL plugin to generate a `schema.graphql` file from the config.

The JSON config for either VS Code's or IntelliJ's config file is:

```json
{
  "name": "Collab Lab GraphQL Schema",
  "schemaPath": "schema.graphql",
  "extensions": {
    "endpoints": {
      "Default GraphQL Endpoint": {
        "url": "https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master",
        "headers": {
          "user-agent": "JS GraphQL"
        },
        "introspect": true
      }
    }
  }
}
```

For other platforms, consult the documentation for your IDE.

## 🔬 Usage

- All of our queries and data fetching methods can be found in `pages/graphql`.
- The `src/_data` directory is used to create variables and pass data to the `*.liquid` files.
- The `src/assets` is where all of our JavaScript, stylesheets, image assets, fonts, and other asset files can be found.
- The `src/_includes` hosts the main layout file (defined in `src/pages.11tydata.json`) along with any additional reusable templates.
- All of the `src/*.11tydata.js` files are used to create variables and pass data to the `src/*.html` files, which generate the different pages on the site.

To run the site:

```shell
npm run dev # starts the dev server on port 8080
```

To build the site:

```
npm run build # builds the site and outputs it in the /build/ folder
```

To build and run the build version of the site:

```
npm run build:serve # builds and serves the site in localhost:5000
```

## ✨Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please [fork the repo](https://github.com/the-collab-lab/website/fork) and create a pull request, or [create a new issue](https://github.com/the-collab-lab/website/issues)!

### How to Fork the Project
1. Fork the repository with [this link](https://github.com/the-collab-lab/website/fork) or with the "Fork" button at the top of the repository page
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a pull request, using your repository and branch as the source, and the `main` branch of this repo as the base.
