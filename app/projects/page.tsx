import { permanentRedirect } from "next/navigation";

/** The projects index moved to the #work section on the home page. */
export default function ProjectsIndexRedirect() {
  permanentRedirect("/#work");
}
