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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}