import { useRef, useEffect, useState } from "react";
import { LoaderIcon, PaperclipIcon, SendHorizontalIcon } from 'lucide-react'

export default function ChatInput({ maxHeight = 96, send }) {
    const textareaRef = useRef(null);
    const [ message, setMessage ] = useState()
    const [ files, setFiles ] = useState([])
    const [ loading, setLoading ] = useState(false)
    
    const adjustHeight = () => {        
        const el = textareaRef.current;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, maxHeight) + "px"; // Max balandlik: ~5 qator
    };

    useEffect(() => {
        const el = textareaRef.current;
        el.addEventListener("input", adjustHeight);
        return () => el.removeEventListener("input", adjustHeight);
    }, []);

    const changeFiles = (e) => {
        setFiles(Object.values(e.target.files))
    }

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await send(message, files)
            setMessage('')
            setFiles([])
            setTimeout(() => {
                adjustHeight()
                textareaRef.current.focus()
            }, 20)
        } finally {
            setLoading(false)
        }
    }

    return <div className="card border-none p-2 px-1 gap-1.5">
        { files.length > 0 && <div className="flex flex-wrap gap-2">
            { files.map(file => {              
                return <div className="glow">
                    { file.name }
                </div>
            }) }
        </div>}
        <form className="flex flex-row items-end">
            <label className="glow">
                <input
                    multiple
                    hidden
                    type="file"
                    onChange={changeFiles}
                />
                <PaperclipIcon />
            </label>
            <div className="glow glow-active !rounded flex-1 flex items-center">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    className="w-full overflow-y-auto outline-none resize-none break-words whitespace-pre-wrap text-wrap scrollbar-none !bg-transparent"
                    placeholder="Xabar yozing..."
                    suppressContentEditableWarning
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                />
            </div>
            <button className="glow pl-4" onClick={submit}>
                { !loading ? <SendHorizontalIcon /> : <LoaderIcon />}
            </button>
        </form>
    </div>
}
