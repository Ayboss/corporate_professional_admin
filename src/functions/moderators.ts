import { TModerator } from "@/types/moderators";
import httprequest from "@/utils/httpRequest";
import { errorMessage, successMessage } from "@/utils/toastalert";

export async function getAllModerators() {
  try {
    const response = await httprequest.get("/admin/moderators/");
    return response.data as TModerator[];
  } catch (err) {
    errorMessage(err, "Error getting moderators");
    return [];
  }
}

export async function makeUserAModerator(
  url: string,
  { arg }: { arg: { user_id: string } }
) {
  try {
    await httprequest.post(`/admin/moderators/${arg.user_id}/make`);
    successMessage("Moderator created successfully");
  } catch (err) {
    errorMessage(err);
  }
}

export async function removeAModerator(
  url: string,
  { arg }: { arg: { user_id: string } }
) {
  try {
    await httprequest.delete(`/admin/moderators/${arg.user_id}`);
    successMessage("Moderator removed successfully");
  } catch (err) {
    errorMessage(err);
  }
}
