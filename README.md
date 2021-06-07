# Jira Update
Update Jira issue

> ##### Only supports Jira Cloud. Does not support Jira Server (hosted)

## Usage

> ##### Note: this action requires [Jira Login Action](https://github.com/marketplace/actions/jira-login)

![Issue Transition](../assets/example.gif?raw=true)

Example transition action:

```yaml
- name: Update issue
  id: update
  uses: miguelcobain/gajira-update@master
  with:
    issue: GA-181
    payload: >
      {
        "fields": {
          "fixVersions": [{ "name": "Next Release" }],
          "customfield_10073": "someValue"
        }
      }
}
```

The `issue` parameter can be an issue id created or retrieved by an upstream action – for example, [`Create`](https://github.com/marketplace/actions/jira-create) or [`Find Issue Key`](https://github.com/marketplace/actions/jira-find). Here is full example workflow:

```yaml
on:
  push

name: Test Update Issue

jobs:
  test-transition-issue:
    name: Transition Issue
    runs-on: ubuntu-latest
    steps:
    - name: Login
      uses: atlassian/gajira-login@master
      env:
        JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
        JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
        JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}
        
    - name: Create new issue
      id: create
      uses: atlassian/gajira-create@master

    - name: Transition issue
      uses: atlassian/gajira-transition@master
      with:
        issue: ${{ steps.create.outputs.issue }}
        payload: >
          {
            "fields": {
              "fixVersions": [{ "name": "Next Release" }],
              "customfield_10073": "someValue"
            }
          }
```
----
## Action Spec:

### Environment variables
- None

### Inputs
- `issue` (required) - issue key to perform a transition on
- `payload` (required) - The payload data to send to the api. (check the body parameters of in the [api docs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueidorkey-put))

### Outputs
- None

### Reads fields from config file at $HOME/jira/config.yml
- `issue`
- `payload`

### Writes fields to config file at $HOME/jira/config.yml
- None