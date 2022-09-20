
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';



 function ToastEditor() {
    return (
        <Editor
            initialValue="본문을 입력하세요"
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
        />
    )

 }
export default ToastEditor
