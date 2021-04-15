#!/usr/bin/env node
"use strict";
// src/enums/liquibase-commands.enum.ts
var LiquibaseCommands;
(function(LiquibaseCommands2) {
  LiquibaseCommands2["CalculateCheckSum"] = "calculateCheckSum";
  LiquibaseCommands2["ChangelogSync"] = "changelogSync";
  LiquibaseCommands2["ChangelogSyncSql"] = "changelogSyncSQL";
  LiquibaseCommands2["ChangelogSyncToTag"] = "changelogSyncToTag";
  LiquibaseCommands2["ChangelogSyncToTagSql"] = "changelogSyncToTagSQL";
  LiquibaseCommands2["ClearCheckSums"] = "clearCheckSums";
  LiquibaseCommands2["DbDoc"] = "dbDoc";
  LiquibaseCommands2["DeactivateChangeLog"] = "deactivateChangeLog";
  LiquibaseCommands2["Diff"] = "diff";
  LiquibaseCommands2["DiffChangeLog"] = "diffChangeLog";
  LiquibaseCommands2["DropAll"] = "dropAll";
  LiquibaseCommands2["FutureRollbackSql"] = "futureRollbackSQL";
  LiquibaseCommands2["FutureRollbackCountSql"] = "futureRollbackCountSQL";
  LiquibaseCommands2["GenerateChangeLog"] = "generateChangeLog";
  LiquibaseCommands2["Help"] = "help";
  LiquibaseCommands2["History"] = "history";
  LiquibaseCommands2["ListLocks"] = "listLocks";
  LiquibaseCommands2["MarkNextChangeSetRan"] = "markNextChangeSetRan";
  LiquibaseCommands2["MarkNextChangeSetRanSql"] = "markNextChangeSetRanSQL";
  LiquibaseCommands2["RegisterChangeLog"] = "registerChangeLog";
  LiquibaseCommands2["ReleaseLocks"] = "releaseLocks";
  LiquibaseCommands2["Rollback"] = "rollback";
  LiquibaseCommands2["RollbackCount"] = "rollbackCount";
  LiquibaseCommands2["RollbackCountSql"] = "rollbackCountSQL";
  LiquibaseCommands2["RollbackSql"] = "rollbackSQL";
  LiquibaseCommands2["RollbackToDate"] = "rollbackToDate";
  LiquibaseCommands2["RollbackToDateSql"] = "rollbackToDateSQL";
  LiquibaseCommands2["Snapshot"] = "snapshot";
  LiquibaseCommands2["SnapshotReference"] = "snapshotReference";
  LiquibaseCommands2["Status"] = "status";
  LiquibaseCommands2["SyncHub"] = "syncHub";
  LiquibaseCommands2["Tag"] = "tag";
  LiquibaseCommands2["TagExists"] = "tagExists";
  LiquibaseCommands2["UnexpectedChangeSets"] = "unexpectedChangeSets";
  LiquibaseCommands2["Update"] = "update";
  LiquibaseCommands2["UpdateSql"] = "updateSQL";
  LiquibaseCommands2["UpdateCount"] = "updateCount";
  LiquibaseCommands2["UpdateCountSql"] = "updateCountSQL";
  LiquibaseCommands2["UpdateTestingRollback"] = "updateTestingRollback";
  LiquibaseCommands2["UpdateToTag"] = "updateToTag";
  LiquibaseCommands2["UpdateToTagSql"] = "updateToTagSQL";
  LiquibaseCommands2["Validate"] = "validate";
})(LiquibaseCommands || (LiquibaseCommands = {}));

// src/util/command-handler.ts
var _child_process = require('child_process');
var CommandHandler = class {
  static spawnChildProcess(commandString2) {
    console.log(`Running ${commandString2}...`);
    let promise = new Promise((resolve, reject) => {
      _child_process.exec.call(void 0, commandString2, (error, stdout, stderr) => {
        console.log("\n", stdout);
        if (error) {
          console.error("\n", stderr);
          return reject(error);
        }
        resolve(stdout);
      });
    });
    return promise;
  }
};

// src/util/file-helper.ts
var _path = require('path');
var FileHelper = class {
  static get bundledLiquibasePath() {
    if (process.env.NODE_ENV === "test") {
      return this.bundledLiquibasePathForInternalConsumers;
    }
    return this.bundledLiquibasePathForExternalConsumers;
  }
  static get bundledLiquibasePathForExternalConsumers() {
    const liquibaseExecutablePath = _path.join.call(void 0, __dirname, "liquibase/liquibase");
    return liquibaseExecutablePath;
  }
  static get bundledLiquibasePathForInternalConsumers() {
    const liquibaseExecutablePath = _path.join.call(void 0, __dirname, "../../bin/liquibase/liquibase");
    return liquibaseExecutablePath;
  }
};

// src/constants/defaults/mssql-default.config.ts

var MSSQL_DEFAULT_CONFIG = {
  url: "jdbc:sqlserver://<IP_OR_HOSTNAME>:;database=sqlserver;",
  changeLogFile: "/examples/change-log-examples/mssql/changelog.xml",
  username: "sa",
  password: "",
  classpath: _path.join.call(void 0, __dirname, "../../../drivers/mssql-jdbc-7.4.1.jre8.jar")
};

// src/constants/defaults/postgresql-default.config.ts

var POSTGRESQL_DEFAULT_CONFIG = {
  changeLogFile: "/node_modules/examples/change-log-examples/postgreSQL/changelog.xml",
  url: "jdbc:postgresql://localhost:5432/postgres",
  username: "postgres",
  password: "",
  classpath: _path.join.call(void 0, __dirname, "drivers/postgresql-42.2.8.jar")
};

// src/cli.ts
var args = process.argv.slice(2);
var commandString = getCommandString(args);
CommandHandler.spawnChildProcess(commandString);
function getCommandString(args2) {
  const argsWereProvided = (args2 == null ? void 0 : args2.length) > 0;
  if (!argsWereProvided) {
    throw new Error("CLI call signature does not match the expected format. Please verify you have passed required arguments and parameters.");
  }
  const firstArg = args2[0];
  const firstArgWasAKnownCommand = Object.values(LiquibaseCommands).includes(firstArg);
  const firstArgWasAFlag = firstArg.substr(0, 2) === "--";
  if (firstArgWasAKnownCommand || firstArgWasAFlag) {
    args2.unshift(FileHelper.bundledLiquibasePath);
  }
  return args2.join(" ");
}
