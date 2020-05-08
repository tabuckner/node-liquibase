> Node.js wrapper for Liquibase


## Install

```
$ npm install --save liquibase
```


## Usage
From the index.js file adjust "<>" fields accordingly:
```js
//******** MSSQL default parameters template *********
liquibase: 'liquibase-4.0.0/liquibase',
changeLogFile: 'change-log-examples/mssql/changelog.mssql.sql',
url: '"jdbc:sqlserver://<IP OR HOSTNAME>:<port number>;database=<database name>;"',
username: '<username>',
password: '<password>',
liquibaseProLicenseKey: '<paste liquibase-pro-license-key here>',
classpath: 'Drivers/mssql-jdbc-7.4.1.jre8.jar
```

```js
//******** postgreSQL default parameters template *********
// liquibase: 'liquibase-4.0.0/liquibase',
// changeLogFile: 'change-log-examples/postgreSQL/changelog.postgresql.sql',
// url: 'jdbc:postgresql://<host>:5432/MYDATABASE_TEST',
// username: 'postgres',
// password: 'password',
// liquibaseProLicenseKey: '<paste liquibase-pro-license-key here>',
// classpath: 'Drivers/postgresql-42.2.8.jar'
```

```js
.run('<action>', '<action-params>')
.then(() => console.log('success'))
.catch((err) => console.error('fail', err));
```
run `node liquibase_mssql.js` or `node liquibase_postgresql.js` sample files

## Development
## Build
### CI/CD
This project makes use of [semantic-commits](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) and [semantic-release](https://semantic-release.gitbook.io/semantic-release/).
Commit messages need to follow these conventions for things to work.

When a release is ready, simple make a PR and merge `staging` into `master`. This will trigger the release bot to automatically generate release notes, a git tag, increment the package version accordingly, build the code, release the new Library code, and commit it all back to the `master` branch. **EVERYTHING**

#### Semantic Commits
Here's a quick rundown of what your commit messages could/should look like:

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The *header* is mandatory and the *scope* of the header is optional.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

##### Commit Types
* feat: A new feature
* fix: A bug fix
* docs: Documentation only changes
* style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* refactor: A code change that neither fixes a bug nor adds a feature
* perf: A code change that improves performance
* test: Adding missing or correcting existing tests
* chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
### Local
If you need to build local code changes, you may do so with:
```bash
npm run build
```

### Tests
Run tests with:
```shell
npm run test
```

To substitute your own user/pass for a given environment, make a copy of `.env.example` in root directory as `.env` and update accordingly.

