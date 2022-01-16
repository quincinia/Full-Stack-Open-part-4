# Full-Stack-Open-part-4
Submissions for FSO part 4

Exercises are divided by their parts (a, b, c, and d), with their own respective branches

Builds off of the previous parts

## Exercise 4.15
Followed the story pretty much exactly as it was shown.

## Exercise 4.16
Added validation for username/password, used optional chaining

## Exercise 4.17
Manually added the ObjectId's through MongoDB  

## Exercise 4.18
Added logging in with token authentication. Follows the story pretty much exactly the same.

## Exercise 4.19
Uses tokens to assign a creator to a blog post. Blog requests no longer need a "user" field. Using `findByIdAndUpdate` instead of `save` to get around the "expected `id` to be unique" error.

## Exercise 4.20
Moved the token extracting function into `utils/middleware` rather than keeping it within `controllers/blogs`. When attaching the middleware, make sure it is attached BEFORE the blogs router is attached.  
Updated error handler to handle JsonWebTokenErrors.

## Exercise 4.21
DELETEing a blog now uses authentication. Follows the same pattern as the POST route.

## Exercise 4.22
Made a new middleware to grab the associated user from a token. Used in in the `blogs` controller.

## Exercise 4.23
Updated the test helper to match the current Blog schema.  
`userExtractor` needed to be moved to the routes that need it because it threw token errors for routes that don't require a token (specifically GET).

PUT does not require a token to use.

Note: You can't generate a new ObjectId using an existing value. If you want to use an existing ObjectId, get a reference to it. The test for exercise 4-13 has a different `beforeEach` function for this, as this issue only affects deleting a blog.

Note 2: Tokens do eventually go bad, even if we haven't put an explicit timer on them (?). Make sure to generate a new token by logging in before performing tests