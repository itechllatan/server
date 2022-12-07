export class InvalidPropertyError extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'InvalidPropertyError';
    this.path = path;
    this.type = type;
  }
}

export class BadTokenError extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 498;
    this.name = 'InvalidTokenError';
    this.path = path;
    this.type = type;
  }
}

export class InvalidCounterOfferError extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'InvalidCounterOfferError';
    this.path = path;
    this.type = type;
  }
}

export class InvalidUserError extends Error {
  constructor(msg, path = 'user', type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'InvalidUserError';
    this.path = path;
    this.type = type;
  }
}
export class InvalidDateError extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'InvalidDateError';
    this.path = path;
    this.type = type;
  }
}
export class InvalidError extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'InvalidError';
    this.path = path;
    this.type = type;
  }
}
export class InvalidNullError extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'InvalidNullError';
    this.path = path;
    this.type = type;
  }
}

export class ResourceNotAvailableError extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'resourceNotAvailableError';
    this.path = path;
    this.type = type;
  }
}

export class ExistingResource extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'existingResource';
    this.path = path;
    this.type = type;
  }
}

export class UnauthorizedError extends Error {
  constructor(msg, path, type) {
    super(msg);
    this.status = 498;
    this.name = 'UnauthorizedError';
    this.path = path;
    this.type = type;
  }
}

export class ForbiddenError extends Error {
  constructor(msg, path, type) {
    super(msg);
    this.status = 403;
    this.name = 'ForbiddenError';
    this.path = path;
    this.type = type;
  }
}

export class FormatDocumentError extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'FormatDocumentError';
    this.path = path;
    this.type = type;
  }
}

export class NotFoundError extends Error {
  constructor(msg, path, type = 'Not Found') {
    super(msg);
    this.status = 404;
    this.name = 'NotFoundError';
    this.path = path;
    this.type = type;
  }
}

export class InvalidSignerError extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'InvaliSignerError';
    this.path = path;
    this.type = type;
  }
}

export class InvalidMatrix extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'InvalidMatrix';
    this.path = path;
    this.type = type;
  }
}

export class InvalidControl extends Error {
  constructor(msg, path, type = 'invalid') {
    super(msg);
    this.status = 400;
    this.name = 'InvalidControl';
    this.path = path;
    this.type = type;
  }
}