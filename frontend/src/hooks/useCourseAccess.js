import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { checkCourseAccess } from "@/services/courseAccessService";

export function useCourseAccess(courseId) {
  const { data: session } = useSession();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!session) {
        router.push("/auth");
        return;
      }

      try {
        const access = await checkCourseAccess(courseId, session.accessToken);
        setHasAccess(access);
      } catch (error) {
        console.error("Error checking course access:", error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [courseId, session, router]);

  return { hasAccess, isLoading };
}
