import { useEffect, useRef } from 'react'
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react'

export default function Editor({ change, value, defaultValue, ...more }) {
    const editor_ref = useRef()

    useEffect(() => {
        return () => {
            if (editor_ref.current) {
                editor_ref.current.destroy();
            }
        };
    }, []);

    return  <TinyMCEEditor
        apiKey='pm2u094ifzuht5eqyza7wmvmbqwsh9ij0kffkz421ffyngo7'
        onInit={(_evt, editor) => editor_ref.current = editor}
        onEditorChange={change}
        value={value === '' || value ? value : defaultValue}
        init={{
            height: 500,
            menubar: false,
            plugins: [
                'advlist', 'fullscreen', 'autolink', 'autolink', 'lists', 'link', 'image', 'hr', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code',
                'insertdatetime', 'media', 'table', 'help', 'wordcount',
            ],
            toolbar: 'undo redo | preview fullscreen blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent table image code hr searchreplace anchor | ' +
                'removeformat | help',
        }}
        { ...more }
    /> 
}
