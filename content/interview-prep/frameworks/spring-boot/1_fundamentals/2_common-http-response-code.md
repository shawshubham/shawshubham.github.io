---
title: "Common HTTP Response Codes in APIs"
layout: "interview-prep-topic-content"
interview:
  id: "spring-102"
  phase: "Core"
  topic: "Fundamentals"
  round: "Technical"
  company: ""
  tags:
    ["http", "status codes", "rest api", "spring boot", "response codes"]
---

## 1. Short Answer (Interview Style)

---

> **HTTP response codes are standard status codes returned by the server to indicate the result of an API request. In backend systems, they help clients understand whether a request succeeded, failed because of invalid input, lacked authorization, or failed due to a server-side issue.**

---

## 2. Why This Question Matters

---

This question tests:

- API fundamentals
- REST design clarity
- ability to map business outcomes to correct responses
- understanding of client vs server errors

👉 This is a common backend and Spring Boot interview question because bad status code usage often causes confusion in production systems.

---

## 3. Broad Categories

---

HTTP status codes are grouped into categories:

- **2xx** → success
- **4xx** → client-side/request issue
- **5xx** → server-side failure

👉 In interviews, you should explain the category first, then the specific codes.

---

## 4. Common Success Codes

---

### 200 OK

Used when request succeeds and response body is returned.

Examples:

- fetching user details
- successful update with response body
- successful calculation/result API

---

### 201 Created

Used when a new resource is successfully created.

Examples:

- create user
- create order
- create payment record

---

### 202 Accepted

Used when request is accepted but processing will happen asynchronously.

Examples:

- report generation started
- file processing queued
- background job submitted

---

### 204 No Content

Used when request succeeds but no response body is needed.

Examples:

- delete successful
- update successful with nothing to return

---

## 5. Common Client Error Codes

---

### 400 Bad Request

Used when the request itself is invalid.

Common reasons:

- malformed JSON
- missing required field
- invalid field format
- failed validation

---

### 401 Unauthorized

Used when authentication is missing or invalid.

Common reasons:

- missing token
- expired token
- invalid credentials

👉 Important: this usually means the client is **not authenticated**.

---

### 403 Forbidden

Used when the user is authenticated but not allowed to access the resource.

Common reasons:

- insufficient role
- permission denied
- restricted resource

---

### 404 Not Found

Used when the requested resource does not exist.

Examples:

- user ID not found
- order not found
- endpoint path incorrect

---

### 405 Method Not Allowed

Used when the endpoint exists but the HTTP method is not supported.

Example:

- calling `POST` on endpoint that only supports `GET`

---

### 409 Conflict

Used when request conflicts with current resource state.

Examples:

- duplicate email/user creation
- version conflict
- resource already exists

---

### 415 Unsupported Media Type

Used when the request content type is not supported.

Example:

- API expects JSON but request sends XML or plain text

---

### 422 Unprocessable Entity

Used when the request format is valid but business validation fails.

Examples:

- negative price
- invalid date range
- business rule violation

---

### 429 Too Many Requests

Used when rate limit is exceeded.

Example:

- too many API calls in short time

---

## 6. Common Server Error Codes

---

### 500 Internal Server Error

Used when an unexpected server-side failure happens.

Common reasons:

- null pointer exception
- unhandled exception
- DB failure
- coding bug

---

### 502 Bad Gateway

Used when a gateway or proxy receives invalid response from upstream service.

Common in:

- microservices
- API gateway setups
- reverse proxies

---

### 503 Service Unavailable

Used when the service is temporarily unavailable.

Common reasons:

- server overloaded
- maintenance window
- downstream unavailable
- thread pool or DB connection pool exhaustion

---

### 504 Gateway Timeout

Used when a gateway or proxy does not receive response in time from upstream service.

Common reasons:

- downstream API timeout
- overloaded backend
- network delay

---

## 7. Important Differences (Interview Favorites)

---

### 401 vs 403

- **401** → not authenticated
- **403** → authenticated but not allowed

---

### 403 vs 404

- **403** → resource exists but access denied
- **404** → resource does not exist

---

### 500 vs 503

- **500** → unexpected internal application failure
- **503** → service temporarily unavailable or overloaded

---

### 200 vs 204

- **200** → success with response body
- **204** → success with no response body

---

## 8. How This Fits in Spring Boot

---

In Spring Boot, status codes are commonly returned using:

- `ResponseEntity`
- `@ResponseStatus`
- global exception handlers using `@ControllerAdvice`

Example:

```java
@GetMapping("/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    return ResponseEntity.ok(userService.getUser(id));
}
```

---

Example for not found:

```java
@ExceptionHandler(UserNotFoundException.class)
public ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
}
```

---

## 9. Common Mistakes

---

❌ Returning `200 OK` even when request failed  
❌ Using `500` for validation errors  
❌ Confusing `401` and `403`  
❌ Returning raw exception messages to clients  

---

## 10. Real Production Angle

---

Wrong status codes cause real problems:

- monitoring becomes misleading
- client retry behavior becomes incorrect
- debugging takes longer
- frontend error handling becomes inconsistent

👉 Example:
If validation error returns `500` instead of `400`, operations team may think the server is failing when the real issue is bad client input.

---

## 11. Interview Summary Answer (Best Answer)

---

If interviewer asks:

> What are some common HTTP response codes in APIs?

Answer:

> Common HTTP response codes include 200 for success, 201 for resource creation, 204 for success with no response body, 400 for bad request, 401 for unauthenticated access, 403 for forbidden access, 404 for resource not found, 409 for conflict, 500 for internal server error, and 503 for service unavailable. Broadly, 2xx indicates success, 4xx indicates client-side issues, and 5xx indicates server-side failures.