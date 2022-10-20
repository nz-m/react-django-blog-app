export class GetContent {
  static URL = `${process.env.REACT_APP_BASE_URL}/api/blogs/`;
  static async fetchBlog(id) {
    const response = await fetch(`${GetContent.URL}${id}`);
    const data = await response.json();
    return data;
  }

  static async fetchComments(id) {
    const response = await fetch(`${GetContent.URL}${id}/comments`);
    const data = await response.json();
    return data;
  }

  static async fetchAllBlogs() {
    const response = await fetch(GetContent.URL);
    const data = await response.json();
    return data;
  }

  static async fetchAllBlogsByCategory(category) {
    const response = await fetch(`${GetContent.URL}?category=${category}`);
    const data = await response.json();
    return data;
  }
}
