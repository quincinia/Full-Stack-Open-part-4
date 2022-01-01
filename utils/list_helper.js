// Assumes each blog is properly formatted

const dummy = (/* blogs */) => {
    return 1
}

// Sums all likes across all blogs
const totalLikes = (blogs) => {
    const adder = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(adder, 0)
}

// Finds first blog post with the most likes
const favoriteBlog = (blogs) => {
    const compare = (curr, blog) => {
        if (curr !== null) {
            return curr.likes > blog.likes ? curr : blog
        } else {
            return blog
        }
    }
    const result = blogs.reduce(compare, null)
    return result ? {
        title: result.title,
        author: result.author,
        likes: result.likes
    } : result
}

// Finds first author with the most # of blogs
const mostBlogs = (blogs) => {
    const blogCounter = {}

    // Increments or inits the blog count of an author
    const updateBlogCount = (author) => {
        blogCounter[author] = (blogCounter[author] || 0) + 1
    }

    // Count all the blogs
    blogs.forEach(blog => updateBlogCount(blog.author))

    // 'result' stores the name of the author
    let result = null
    for (const author in blogCounter) {
        if (result !== null) {
            result = blogCounter[result] > blogCounter[author] ? result : author
        } else {
            result = author
        }
    }

    return result === null ? null : { author: result, blogs: blogCounter[result] }
}

// Finds the author with the most likes across all blog posts
// Similar algo to mostBlogs
const mostLikes = (blogs) => {
    const likesCounter = {}

    const updateLikesCount = (blog) => {
        likesCounter[blog.author] = (likesCounter[blog.author] || 0) + blog.likes
    }

    blogs.forEach(blog => updateLikesCount(blog))

    let result = null
    for (const author in likesCounter) {
        if (result !== null) {
            result = likesCounter[result] > likesCounter[author] ? result : author
        } else {
            result = author
        }
    }

    return result === null ? null : { author: result, likes: likesCounter[result] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}