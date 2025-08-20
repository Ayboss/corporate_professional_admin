import { TComment, TPost, TPostAndAnalytics } from "@/types/posts";
import httprequest from "@/utils/httpRequest";
import { errorMessage, successMessage } from "@/utils/toastalert";

export async function getAllPost(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(`/admin/posts/?${arg.query}`);
    return response.data as TPostAndAnalytics[];
  } catch (err) {
    errorMessage(err);
    return [];
  }
}

export async function getUserPost(url: string) {
  try {
    const response = await httprequest.get(url);
    return response.data as TPost;
  } catch (err) {
    errorMessage(err);
    return null;
  }
}

export const fetchPostComments = async (url: string) => {
  return httprequest
    .get(url)
    .then((res) => res.data as TComment[])
    .catch(() => []);
};

export async function updatePostVisibility(
  url: string,
  { arg }: { arg: { post_id: string; visibility: "public" | "private" } }
) {
  try {
    const response = await httprequest.patch(
      `/admin/posts/${arg.post_id}/visibility`,
      {
        visibility: arg.visibility,
      }
    );
    successMessage("Post Visibility updated");
    return response.data;
  } catch (err) {
    errorMessage(err);
  }
}

export async function deletePost(
  url: string,
  { arg }: { arg: { post_id: string } }
) {
  try {
    const response = await httprequest.delete(`/admin/posts/${arg.post_id}`);
    successMessage("Post deleted");
    return response.data;
  } catch (err) {
    errorMessage(err);
  }
}
