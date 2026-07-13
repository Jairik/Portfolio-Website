/* "$ readme / code / live / video" link buttons for a project. */
import { Link } from "react-router-dom";
import { slug, type HomeProject } from "../../lib/terminalHomeData";

/* readme always links to the project's detail page; the rest render only when
   the project actually has that link */
export default function ProjectLinks({ p, style }: { p: HomeProject; style?: React.CSSProperties }) {
  return (
    <div className="plinks" style={style}>
      <Link to={`/projects/${slug(p.title)}/`}>readme</Link>
      {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer">code</a>}
      {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">live</a>}
      {p.video && <a href={p.video} target="_blank" rel="noopener noreferrer">video</a>}
    </div>
  );
}
