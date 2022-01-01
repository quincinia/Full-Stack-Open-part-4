const dummy = (/* blogs */) => {
    return 1
}

const totalLikes = (blogs) => {
    // Assumes each blog is properly formatted
    const adder = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(adder, 0)
}

module.exports = {
    dummy,
    totalLikes
}