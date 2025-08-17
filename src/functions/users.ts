/* eslint-disable @typescript-eslint/no-unused-vars */
import { TFullUserDetails, TMetrics, TUser } from "@/types/users";
import httprequest from "@/utils/httpRequest";
import { errorMessage, successMessage } from "@/utils/toastalert";
import { mutate } from "swr";

export async function getAllUser(url: string) {
  try {
    const response = await httprequest.get(url);
    return response.data as TUser[];
  } catch (err) {
    return [];
  }
}

export async function getUserProfile(url: string) {
  const response = await httprequest.get(url);
  return response.data as TFullUserDetails;
}

export async function bulkActionOnUser(
  url: string,
  { arg }: { arg: { user_ids: string[]; action: string } }
) {
  try {
    const response = await httprequest.post("/admin/users/bulk-actions", {
      user_ids: arg.user_ids,
      action: arg.action,
    });
    successMessage("Action Succesful");
    return response.data;
  } catch (err) {
    errorMessage(err);
  }
}

export async function bulkEnhancedActionOnUser(
  url: string,
  { arg }: { arg: { user_ids: string[]; action: string; reason: string } }
) {
  try {
    const response = await httprequest.post(
      "/admin/users/enhanced-bulk-actions",
      {
        user_ids: arg.user_ids,
        action: arg.action,
        reason: arg.reason,
      }
    );
    successMessage("Action Succesful");
    return response.data;
  } catch (err) {
    errorMessage(err);
  }
}

export async function deactivateUser(
  url: string,
  { arg }: { arg: { user_id: string } }
) {
  try {
    const response = await httprequest.post(
      `/admin/users/${arg.user_id}/deactivate`
    );
    successMessage("User deactivated successfully");
    mutate<TFullUserDetails>(
      `/admin/users/${arg.user_id}/details`,
      (currentData) => {
        if (!currentData) return currentData;
        return {
          ...currentData,
          user: { ...currentData.user, is_active: false },
        };
      }
    );
    return response.data;
  } catch (err) {
    errorMessage(err);
  }
}

export async function activateUser(
  url: string,
  { arg }: { arg: { user_id: string } }
) {
  try {
    const response = await httprequest.post(
      `/admin/users/${arg.user_id}/activate`
    );
    successMessage("User activated successfully");
    mutate<TFullUserDetails>(
      `/admin/users/${arg.user_id}/details`,
      (currentData) => {
        if (!currentData) return currentData;
        return {
          ...currentData,
          user: { ...currentData.user, is_active: true },
        };
      }
    );
    return response.data;
  } catch (err) {
    errorMessage(err);
  }
}

export async function updateUserDetailsViaAdmin(
  url: string,
  { arg }: { arg: TUser }
) {
  try {
    const response = await httprequest.post(`/admin/users/${arg.id}`, arg);
    successMessage("User updated succesfully");
    return response.data;
  } catch (err) {
    errorMessage(err);
  }
}

export async function dashboardMetrics() {
  const response = await httprequest.get("/admin/metrics");
  return response.data as TMetrics;
}

export async function searchForUsers(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(
      `/admin/users/enhanced-search?${arg.query}`
    );
    return response.data as TUser[];
  } catch (err) {}
}

export async function adminNoteForUser(
  url: string,
  { arg }: { arg: { user_id: string; notes: string } }
) {
  try {
    const response = await httprequest.put(
      `/admin/users/${arg.user_id}/admin-notes`,
      {
        notes: arg.notes,
      }
    );
    successMessage("Note send Succesful");
    return response.data;
  } catch (err) {
    errorMessage(err);
  }
}

export async function exportUsers(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(`/admin/users/export?${arg.query}`);
    return response.data;
  } catch (err) {
    errorMessage(err);
  }
}

export async function downloadUserCv(url: string) {
  const response = await httprequest.get(url);
  return response.data;
}
