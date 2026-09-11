import { permanentRedirect } from "next/navigation";

/** This is a single-page site now — work moved to the #work section on the home page. */
export default function WorkIndexRedirect() {
  permanentRedirect("/#work");
}
