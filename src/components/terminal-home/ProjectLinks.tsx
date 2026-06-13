/* "$ code / live / video" link buttons for a project. */
import type { HomeProject } from "../../lib/terminalHomeData";

/* Renders only the links the project actually has (nothing when all empty) */
export default function ProjectLinks({ p, style }: { p: HomeProject; style?: React.CSSProperties }) {
  return (
    <div className="plinks" style={style}>
      {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer">code</a>}
      {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">live</a>}
      {p.video && <a href={p.video} target="_blank" rel="noopener noreferrer">video</a>}
    </div>
  );
}
