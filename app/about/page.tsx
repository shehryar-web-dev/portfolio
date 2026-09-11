import { permanentRedirect } from "next/navigation";

/** This is a single-page site now — about moved to the #about section on the home page. */
export default function AboutIndexRedirect() {
  permanentRedirect("/#about");
}
