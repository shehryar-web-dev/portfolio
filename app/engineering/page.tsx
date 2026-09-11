import { permanentRedirect } from "next/navigation";

/** This is a single-page site now — engineering moved to the #engineering section on the home page. */
export default function EngineeringIndexRedirect() {
  permanentRedirect("/#engineering");
}
