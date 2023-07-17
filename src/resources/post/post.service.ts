import postModel from "./post.model";
import Post from "./post.interface";

class PostService {
  private post = postModel;

  public async create(title: string, body: string): Promise<Post> {
    try {
      console.log(title)
      const post = await this.post.create({title, body});
      return post;
    } catch (e: any) {
      throw new Error("Error creating post");
    }
  }
}
export default PostService;
