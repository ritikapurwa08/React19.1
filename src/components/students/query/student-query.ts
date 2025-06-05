import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";

export const useGetCurrentUser = () => {
  const user = useQuery(api.students.getCurrentUser);
  return user;
};
