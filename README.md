# BizRez Worklist Assignments

# curl

## CRUD(l)

Authenticate  curl http://localhost:3000/authenticate?name=john&pwd=smith
  returns {"ok":1} 1=authenticated 0=fail

-    curl -X POST http://localhost:3000/assignments/create?input={test:'test'}
-    curl http://localhost:3000/assignments/read?input={test:'test'}
-    curl -X POST http://localhost:3000/assignments/update?input={test:'test'}
-    curl -X DELETE http://localhost:3000/assignments/delete?input={test:'test'}
-    curl http://localhost:3000/assignments/list?input={test:'test'}



curl -X POST http://localhost:3000/assignments/read?input={test:'test'}

# JSON
## Required Properties

```
assignee = {
  orgUnit: 'Organization unit',
  ownerId: 'owner of assignment',
  ownerType: 'person || system'
}

assignment = {
  assignee: {Object of type assignee},
  type: 'type of assignment'
  status: 'new, open, closed, hold',
  statusInfo: 'why, what, where',
  priority: 'low, med, high',
  goalDate: Date(),
  deadlineDate Date(),
  header: '{} Object header',
  body: '{} Object of details',
  sourcelink: 'link to source for deep linking',
  id: 'system generated'
}

```

#

### list


