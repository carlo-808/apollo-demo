# apollo-demo
Simple Apollo Graphql demo application instrumented with New Relic

## Setup

Add a `.env` file to the root of the folder with the following variables set.

`NEW_RELIC_LICENSE_KEY`
`NEW_RELIC_APP_NAME`

If running agent against staging add:
`NEW_RELIC_HOST=staging-collector.newrelic.com`

## Running the application
`> npm run start`

Application will run at http://localhost/4000

## Some Queries to Run

### Simple Query

```json
query {
    libraries {
      books {
        title
        author {
          name
        }
      }
    }
  }
```

```bash
curl -X POST http://localhost:4000 -H 'Content-Type: application/json' -d '{"query":"query { libraries { books { title author { name } }}}"}'
```

### Parameterized Query

```json
{
    "query": "query branchQuery($branch: String!) {
      library(branch: $branch) {
        magazines { title }
      }
    }",
    "variables":
    {
        "branch": "riverside"
    },
    "operationName": "branchQuery"
}
```

```bash
curl -X POST http://localhost:4000 -H 'Content-Type: application/json' -d '{"query":"query branchQuery($branch: String!) {\n  library(branch: $branch) {\n    magazines {\n      title\n    }\n  }\n}\n","variables":{"branch":"riverside"},"operationName":"branchQuery"}'
```

### Nested Parameterized Query

```json
query {
      library(branch: "riverside") {
        magazines {
          title
        },
        books(category: NOVEL) {
          title
        }
      }
    }
```

```bash
curl -X POST http://localhost:4000 -H 'Content-Type: application/json' -d '{"query":"query {library(branch: \"riverside\") {  magazines {    title  },  books(category: NOVEL) {    title  }}\n    }"}'
```

### Mutation

```json
mutation {
  addThing(name: "added thing!")
}
```

```bash
curl -X POST http://localhost:4000 -H 'Content-Type: application/json' -d '{"query":"mutation { addThing(name: \"added thing!\")}"}'
```
