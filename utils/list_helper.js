// Assumes each blog is properly formatted

const dummy = (/* blogs */) => {
    return 1
}

const totalLikes = (blogs) => {
    const adder = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(adder, 0)
}

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

const mostBlogs = (blogs) => {
    let counter = {}

    // Increments or inits the blog count of an author
    const update = (author) => {
        counter[author] = (counter[author] || 0) + 1
    }

    // Count all the blogs
    blogs.forEach(blog => update(blog.author))

    // 'result' stores the name of the author
    let result = null
    for (const author in counter) {
        if (result !== null) {
            result = counter[result] > counter[author] ? result : author
        } else {
            result = author
        }
    }

    return result === null ? null : { author: result, blogs: counter[result] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}