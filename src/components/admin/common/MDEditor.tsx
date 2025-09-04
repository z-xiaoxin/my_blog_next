import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

function MDEditor({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return <MdEditor value={value} onChange={setValue} />;
}

export default MDEditor;
