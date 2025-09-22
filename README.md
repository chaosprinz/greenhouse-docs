# greenhouse-docs

An open-source weed-greenhouse documentation and automation system.

## Error Handling API Overview

This library provides a structured way to define, use, and transform database-related errors in a consistent and type-safe manner.

Purpose:

- ✅ Provide typed, structured errors instead of generic Error
- ✅ Ensure consistent constructors for all database errors
- ✅ Allow centralized error transformation (e.g. toDbError)
- ✅ Make it easy to extend with new error types
- ✅ Provide machine-readable JSON output for APIs

File Structure:

- errors/
  - index.ts
  - DbError.ts
  - registry.ts
  - DB_ERROR_CODES.ts
  - types.ts
  - toDbError.ts
  - DbErrors/
    - NotFoundError.ts
    - UnknownDbError.ts
    - ValidationError.ts

### Unified constructor contract:

All database errors must accept DbErrorOptions in their constructor,
so `toDbError` can call it.

### Serializing with `toJson`

Every DbError can be serialized to JSON via .toJSON(),
which includes name, code, message, timestamp, and any contextual fields.

### Extensibility:

Adding new errors means:

- Create subclass extending DbError
- Add static code and code property
- Register in DB_ERROR_REGISTRY

### Usage examples

```ts
import { NotFoundError, ValidationError, toDbError } from "@/lib/data/errors";

// Example: throwing a specific error
function getUser(id: string) {
  const user = null; // pretend DB call
  if (!user) {
    throw new NotFoundError({ entity: "User", id });
  }
  return user;
}

// Example: catching and normalizing unknown errors
try {
  getUser("42");
} catch (err) {
  const dbError = toDbError(err, {
    fallback: new ValidationError({ entity: "User" }),
  });

  console.error("Handled DB Error:", dbError.toJSON());

  // Example log output:
  // {
  //   name: "NotFoundError",
  //   code: "NOT_FOUND",
  //   message: "User with id 42 not found",
  //   timestamp: 1699999999999,
  //   entity: "User",
  //   id: "42",
  //   field: undefined
  // }
}
```

### Adding new error-types

```ts
// errors/DbErrors/PermissionDeniedError.ts
import { DbError } from "../DbError";
import { DB_ERROR_CODES } from "../DB_ERROR_CODES";
import { DbErrorOptions } from "../types";

export class PermissionDeniedError extends DbError {
  static code = DB_ERROR_CODES.PERMISSION_DENIED;
  code = PermissionDeniedError.code;

  constructor(options: DbErrorOptions = {}) {
    super(`Permission denied for ${options.entity ?? "resource"}`, options);
  }
}

// errors/DB_ERROR_CODES.ts
export const DB_ERROR_CODES = {
  ...,
  PERMISSION_DENIED: "PERMISSION_DENIED",
};

// errors/registry.ts
import { PermissionDeniedError } from "./DbErrors/PermissionDeniedError";

export const DB_ERROR_REGISTRY = {
  ...,
  [DB_ERROR_CODES.PERMISSION_DENIED]: PermissionDeniedError,
};
```

Now you can use it:

```ts
throw new PermissionDeniedError({ entity: "Post", id: "42" });
```

---

## License

![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)
