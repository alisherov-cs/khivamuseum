import {useState, useRef, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {ImageDownIcon, TrashIcon} from 'lucide-react'
import {server_endpoint} from '../../../helper/server_url'

export default function ImageUploader({
    images = [],
    setImages = () => {},
    defaultValue = [],
    accept = '.jpg, .jpeg, .png, .webp',
    max = 1
}) {
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (defaultValue?.length > 0) {
            setImages(
                defaultValue.map(item => ({
                    src: server_endpoint(item),
                    id: Date.now() + Math.random().toString(36).substr(2, 9)
                }))
            )
        }
    }, [defaultValue])

    const handleDragOver = e => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = e => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files)
        }
    }

    const handleFileChange = e => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files)
        }
    }

    const handleFiles = files => {
        let newFiles = Array.from(files).filter(file => {
            const fileType = file.name.split('.').pop().toLowerCase()
            return accept.includes(fileType)
        })

        if (newFiles.length === 0) return

        if (images.length + newFiles.length > max) {
            newFiles = newFiles.slice(0, max - images.length) // Maksimal limitni oshirmaslik
        }

        const newImages = [...images]

        newFiles.forEach(file => {
            const reader = new FileReader()
            reader.onload = e => {
                newImages.push({
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                    src: e.target.result,
                    file
                })
                setImages([...newImages])
            }
            reader.readAsDataURL(file)
        })
    }

    const removeImage = id => {
        setImages(images.filter(image => image.id !== id))
    }

    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3, delay: 0.4}}
                className='relative'>
                <motion.div
                    animate={{
                        backgroundColor: isDragging ? 'rgba(251, 191, 36, 0.1)' : 'transparent'
                    }}
                    className={`border-2 border-dashed ${
                        isDragging ? 'border-primary' : 'border-border dark:border-white/20'
                    } rounded-xl p-8 flex flex-col items-center transition-colors`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    <input
                        type='file'
                        ref={fileInputRef}
                        multiple
                        accept={accept}
                        onChange={handleFileChange}
                        className='hidden'
                    />

                    <motion.div
                        initial={{scale: 1}}
                        animate={{scale: isDragging ? 1.05 : 1}}
                        transition={{type: 'spring', stiffness: 300, damping: 15}}
                        className='text-center flex flex-col items-center'>
                        <motion.div
                            className='mx-auto mb-4 p-6 rounded-full bg-primary flex items-center justify-center'
                            animate={{
                                backgroundColor: isDragging ? 'rgba(251, 191, 36, 0.3)' : 'rgba(251, 191, 36, 0.2)'
                            }}>
                            <ImageDownIcon className='stroke-text size-12' />
                        </motion.div>
                        <p className='text-sm mb-2'>Rasmlarni ushbu maydon ichiga tashlang yoki</p>
                        <motion.button
                            type='button'
                            onClick={() => fileInputRef.current?.click()}
                            className='button text-sm'>
                            Yuklang
                        </motion.button>
                        <p className='text-xs opacity-70 mt-2'>
                            {accept.toUpperCase()} formatlarida maksimum {max} ta rasm, 10MB
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>

            {images.length > 0 && (
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.4}}
                    className='card mt-4 border-border border shadow-none'>
                    <div className='flex items-baseline justify-between'>
                        <h3 className='text-md font-medium mb-3'>Yuklangan rasmlar</h3>
                        <span className='text-sm'>
                            <span className='font-semibold'>{images.length}</span> ta rasm yuklangan
                        </span>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                        <AnimatePresence>
                            {images.map(image => (
                                <motion.div
                                    key={image.id}
                                    layout
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.8, transition: {duration: 0.2}}}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow:
                                            '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                    }}
                                    transition={{type: 'spring', stiffness: 300, damping: 20}}
                                    className='relative aspect-square rounded-lg overflow-hidden group border border-border'>
                                    <img src={image.src} alt='Uploaded' className='w-full h-full object-cover' />
                                    <motion.div
                                        initial={{opacity: 0}}
                                        whileHover={{opacity: 1}}
                                        className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                                        <motion.button
                                            type='button'
                                            whileHover={{scale: 1.1}}
                                            whileTap={{scale: 0.9}}
                                            onClick={() => removeImage(image.id)}
                                            className='bg-red-500 text-white p-2 rounded-full'>
                                            <TrashIcon className='stroke-white size-4' />
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </>
    )
}
