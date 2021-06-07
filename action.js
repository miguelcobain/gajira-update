const Jira = require('./common/net/Jira')

module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const { argv } = this

    const issueId = argv.issue

    await this.Jira.updateIssue(issueId, JSON.parse(argv.payload))

    console.log(`Updated ${issueId}.`)
    console.log(`Link to issue: ${this.config.baseUrl}/browse/${issueId}`)

    return {}
  }
}
