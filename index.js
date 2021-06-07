const fs = require('fs')
const YAML = require('yaml')
const core = require('@actions/core')

const configPath = `${process.env.HOME}/jira/config.yml`
const Action = require('./action')

// eslint-disable-next-line import/no-dynamic-require
const githubEvent = require(process.env.GITHUB_EVENT_PATH)
const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function exec () {
  try {
    const result = await new Action({
      githubEvent,
      argv: parseArgs(),
      config,
    }).execute()

    if (result) {
      const extendedConfig = Object.assign({}, config, result)

      fs.writeFileSync(configPath, YAML.stringify(extendedConfig))

      return
    }

    console.log('Failed to update issue.')
    process.exit(78)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

function parseArgs () {
  const payload = core.getInput('payload')

  if (!payload) {
    throw new Error('Error: please specify an update payload')
  }

  return {
    issue: core.getInput('issue'),
    payload,
  }
}

exec()
