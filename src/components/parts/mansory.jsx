import {useState, useEffect, useRef} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

function Masonry() {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState(2)
    const containerRef = useRef(null)
    const [imageHeights, setImageHeights] = useState({})
    const [gridItems, setGridItems] = useState([])

    // 📌 Rasmlarni tashqi API'dan yuklab olish
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://picsum.photos/v2/list?page=1&limit=10')
                const images = await response.json()

                const formattedData = images.map(img => ({
                    id: img.id,
                    image: `${img.download_url}?w=300`
                }))

                setData(formattedData)
            } catch (error) {
                console.error('Fetch error:', error)
            }
        }

        fetchData()
    }, [])

    // 📌 Ekran o‘lchamiga qarab `columns`ni o‘zgartirish
    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth >= 1500) {
                setColumns(5)
            } else if (window.innerWidth >= 1000) {
                setColumns(4)
            } else if (window.innerWidth >= 600) {
                setColumns(3)
            } else {
                setColumns(1)
            }
        }

        updateColumns()
        window.addEventListener('resize', updateColumns)
        return () => window.removeEventListener('resize', updateColumns)
    }, [])

    // 📌 Rasm yuklanganda balandligini olish
    const handleImageLoad = (id, height) => {
        setImageHeights(prev => {
            const newHeights = {...prev, [id]: height}
            calculateGrid(newHeights)
            return newHeights
        })
    }

    // 📌 Gridni qayta hisoblash
    const calculateGrid = heights => {
        let columnHeights = new Array(columns).fill(0)
        let arrangedItems = data.map(item => {
            const height = heights[item.id] || 300 // Default height 300px
            const column = columnHeights.indexOf(Math.min(...columnHeights))
            const x = (100 / columns) * column
            const y = columnHeights[column]
            columnHeights[column] += height

            return {...item, x, y, width: 100 / columns, height}
        })

        setGridItems(arrangedItems)
    }

    useEffect(() => {
        calculateGrid(imageHeights)
    }, [columns, data])

    return (
        <div ref={containerRef} className='masonry' style={{position: 'relative', minHeight: '500px'}}>
            <AnimatePresence>
                {gridItems.map(item => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -50}}
                        transition={{duration: 0.5, ease: 'easeOut'}}
                        style={{
                            position: 'absolute',
                            left: `${item.x}%`,
                            top: item.y,
                            width: `${item.width}%`
                        }}>
                        <img
                            src={item.image}
                            alt='rtyuiop'
                            style={{width: '100%', display: 'block', borderRadius: '8px'}}
                            onLoad={e => handleImageLoad(item.id, e.target.naturalHeight)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default Masonry
