import PostsList from "../components/PostsList/PostsList.tsx";
import PostForm from "../components/PostForm/PostForm.tsx";

export default function PostsLayout() {
  return (
    <>
      <PostsList></PostsList>
      <PostForm></PostForm>
    </>
  )
}