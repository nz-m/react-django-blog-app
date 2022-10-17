export class GetContent {
  static URL = "http://127.0.0.1:8000/api/blogs/";

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
}
