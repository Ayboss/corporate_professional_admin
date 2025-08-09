import { TPost } from "@/types/posts";
import httprequest from "@/utils/httpRequest";
import { errorMessage, successMessage } from "@/utils/toastalert";

export async function getAllPost() {
  try {
    const response = await httprequest.get("/admin/posts");
    return response.data as TPost[];
  } catch (err) {
    return [];
  }
}

export async function updatePostVisibility(
  url: string,
  { arg }: { arg: { visibility: "public" | "private" } }
) {
  try {
    const response = await httprequest.post(
      "/admin/posts/{post_id}/visibility",
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
