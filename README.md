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