
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';


 function ToastEditor() {

    return (
        <Editor
            initialValue="본문을 입력하세요"
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            language="ko-KR"

        />
    )

 }
export default ToastEditor
